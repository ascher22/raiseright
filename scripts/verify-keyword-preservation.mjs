#!/usr/bin/env node
/**
 * verify-keyword-preservation.mjs — Step 5 keyword-preservation gate (RaiseRight).
 *
 * Spec: "Sleipnir the glider/Step 5 — Autonomous SEO Intelligence Prompt.md"
 * (Absolute Keyword Preservation Rule + domain-token placement rule).
 *
 * Checks:
 *   (a) every baseline literal in research/seo-keywords.baseline.txt still exists
 *       verbatim as an entry in lib/seo-keywords.ts (zero deletions, zero edits).
 *   (b) zero domain-shaped tokens (\.com | \.net | http | host shapes) end up in
 *       any visible keyword surface: the SITE_VISIBLE_KEYWORDS derivation in
 *       lib/seo-metadata.ts (buildVisibleKeywords) AND the rerun visible block
 *       STEP5_RERUN_20261102_KEYWORDS.
 *   (c) --self-test: negative tests proving the checker actually catches
 *       deletions, literal edits, and domain-token leaks.
 *
 * Modes:
 *   node scripts/verify-keyword-preservation.mjs                  run the gate
 *   node scripts/verify-keyword-preservation.mjs --write-baseline  snapshot baseline
 *     (run BEFORE editing lib/seo-keywords.ts; writes research/seo-keywords.baseline.txt)
 *   node scripts/verify-keyword-preservation.mjs --self-test       negative tests
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const KEYWORDS_PATH = path.join(ROOT, "lib", "seo-keywords.ts")
const SEO_META_PATH = path.join(ROOT, "lib", "seo-metadata.ts")
const BASELINE_PATH = path.join(ROOT, "research", "seo-keywords.baseline.txt")
const SITE_URL_PATH = path.join(ROOT, "lib", "site-url.ts")
const PROJECT_CONFIG_PATH = path.join(ROOT, "lib", "project-config.ts")

const EXPECTED_BASELINE_LITERALS = 255
const RERUN_VISIBLE_BLOCK = "STEP5_RERUN_20261102_KEYWORDS"

/** Broader than the gate floor (\.com|\.net|http): also catches bare hosts, www., and alt-TLD hosts (com.shopwithscrip.app). */
const DOMAIN_SHAPE =
  /(?:https?:\/\/|www\.|[a-z0-9-]+\.(?:com|net|org|app|io|co|us|edu|gov|info|biz|shop|store|online)\b)/i
/** Gate floor pattern mandated by the task: zero of these may reach visible surfaces. */
const DOMAIN_FLOOR = /\.com|\.net|http/i

/* ------------------------------------------------------------------ */
/* Constant resolution (SITE_DISPLAY_NAME, CANONICAL_HOST, ...)        */
/* ------------------------------------------------------------------ */

function parseConstStrings(src) {
  const map = {}
  const re = /export const (\w+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
  for (const m of src.matchAll(re)) map[m[1]] = m[2] ?? m[3]
  return map
}

function loadConstants() {
  const siteUrlSrc = readFileSync(SITE_URL_PATH, "utf8")
  const projectSrc = readFileSync(PROJECT_CONFIG_PATH, "utf8")
  const map = { ...parseConstStrings(siteUrlSrc), ...parseConstStrings(projectSrc) }
  if (/export const CANONICAL_HOST\s*=\s*new URL\(SITE_ORIGIN\)\.hostname/.test(siteUrlSrc)) {
    if (!map.SITE_ORIGIN) throw new Error("SITE_ORIGIN not found in lib/site-url.ts")
    map.CANONICAL_HOST = new URL(map.SITE_ORIGIN).hostname
  }
  return map
}

function lookup(name, constMap) {
  if (!(name in constMap)) throw new Error(`unresolved identifier: ${name}`)
  return constMap[name]
}

/** Evaluate a single TS expression used inside keyword arrays. */
function evalExpr(expr, constMap) {
  const e = expr.trim()
  let m
  if ((m = e.match(/^(\w+)$/))) return lookup(m[1], constMap)
  if ((m = e.match(/^(\w+)\.toLowerCase\(\)$/))) return lookup(m[1], constMap).toLowerCase()
  if ((m = e.match(/^(\w+)\.replace\(\/\^www\\\.\/,\s*""\)$/))) return lookup(m[1], constMap).replace(/^www\./, "")
  if ((m = e.match(/^(\w+)\.replace\(\/\^www\\\.\/,\s*""\)\.toLowerCase\(\)$/))) {
    return lookup(m[1], constMap).replace(/^www\./, "").toLowerCase()
  }
  throw new Error(`unsupported expression in keyword entry: ${expr}`)
}

/** Resolve one raw array entry (string literal, template literal, or identifier expr) to its runtime value. */
function resolveEntry(raw, constMap) {
  const t = raw.trim()
  let m
  if ((m = t.match(/^`([\s\S]*)`$/))) {
    return m[1].replace(/\$\{([^}]+)\}/g, (_, expr) => evalExpr(expr, constMap))
  }
  if ((m = t.match(/^"([\s\S]*)"$/))) return m[1]
  return evalExpr(t, constMap)
}

/* ------------------------------------------------------------------ */
/* Extraction                                                          */
/* ------------------------------------------------------------------ */

/**
 * Extract `export const NAME = [ ... ] as const` blocks from a TS source.
 * Entries are returned as RAW source tokens (trimmed, trailing comma stripped);
 * comment lines and blank lines inside arrays are skipped.
 */
function extractBlocks(src) {
  const blocks = []
  let current = null
  for (const line of src.split("\n")) {
    const start = line.match(/^export const (\w+)\s*=\s*\[/)
    if (start) {
      current = { name: start[1], entries: [] }
      continue
    }
    if (current) {
      if (/^\]\s*(as const)?\s*$/.test(line)) {
        blocks.push(current)
        current = null
        continue
      }
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) continue
      current.entries.push(trimmed.replace(/,$/, ""))
    }
  }
  if (current) throw new Error(`unterminated keyword array block: ${current.name}`)
  return blocks
}

/* ------------------------------------------------------------------ */
/* Check (a) — baseline preservation                                   */
/* ------------------------------------------------------------------ */

function checkBaselinePreservation(baselineLines, currentRawEntries) {
  const missing = []
  for (const line of baselineLines) {
    if (!currentRawEntries.includes(line)) missing.push(line)
  }
  return { count: baselineLines.length, missing }
}

/* ------------------------------------------------------------------ */
/* Check (b) — visible-surface domain hygiene                          */
/* ------------------------------------------------------------------ */

/** Pull the runtime visible filter (inline regexes + host-token substrings) out of lib/seo-metadata.ts. */
function deriveVisibleFilter(seoMetaSrc, constMap) {
  const fnMatch = seoMetaSrc.match(/export function buildVisibleKeywords\(\)[^{]*\{([\s\S]*?)\n\}/)
  if (!fnMatch) throw new Error("buildVisibleKeywords() not found in lib/seo-metadata.ts")
  const body = fnMatch[1]
  const regexes = []
  const regexLiteral = /\/(?:\\.|\[(?:\\.|[^\]])*\]|[^/\\\n])+\/[gimsuy]*/g
  for (const m of body.matchAll(regexLiteral)) {
    const literal = m[0]
    const parts = literal.match(/^\/([\s\S]+)\/([gimsuy]*)$/)
    regexes.push(new RegExp(parts[1], parts[2]))
  }
  const hostTokens = []
  const htMatch = seoMetaSrc.match(/const VISIBLE_HOST_TOKENS\s*=\s*\[([\s\S]*?)\]/)
  if (htMatch) {
    for (const line of htMatch[1].split("\n")) {
      const t = line.trim().replace(/,$/, "")
      if (!t || t.startsWith("//") || t.startsWith("/*") || t.startsWith("*")) continue
      hostTokens.push(evalExpr(t, constMap).toLowerCase())
    }
  }
  return { regexes, hostTokens }
}

/** Compute what buildVisibleKeywords() would emit, then flag domain-shaped leaks. */
function checkVisibleHygiene(resolvedEntries, filter) {
  const visible = resolvedEntries.filter(
    (k) =>
      !filter.regexes.some((r) => r.test(k)) &&
      !filter.hostTokens.some((h) => k.toLowerCase().includes(h)),
  )
  const violations = visible.filter((k) => DOMAIN_SHAPE.test(k))
  const floorViolations = visible.filter((k) => DOMAIN_FLOOR.test(k))
  return { visible, violations, floorViolations }
}

/* ------------------------------------------------------------------ */
/* Mode: --write-baseline                                              */
/* ------------------------------------------------------------------ */

function writeBaseline() {
  const src = readFileSync(KEYWORDS_PATH, "utf8")
  const blocks = extractBlocks(src)
  const rawEntries = blocks.flatMap((b) => b.entries)
  const sorted = [...rawEntries].sort()
  writeFileSync(BASELINE_PATH, sorted.join("\n") + "\n", "utf8")
  console.log(`baseline snapshot → ${path.relative(ROOT, BASELINE_PATH)}`)
  console.log(`  blocks: ${blocks.map((b) => `${b.name}(${b.entries.length})`).join(", ")}`)
  console.log(`  literals: ${sorted.length} (sorted, one per line, raw source tokens verbatim)`)
  if (sorted.length !== EXPECTED_BASELINE_LITERALS) {
    console.error(`  WARNING: expected ${EXPECTED_BASELINE_LITERALS} baseline literals, got ${sorted.length}`)
    process.exit(1)
  }
}

/* ------------------------------------------------------------------ */
/* Mode: default (run the gate)                                        */
/* ------------------------------------------------------------------ */

function runGate() {
  const failures = []
  const notes = []

  if (!existsSync(BASELINE_PATH)) {
    console.error(`FAIL: ${path.relative(ROOT, BASELINE_PATH)} missing — run with --write-baseline first`)
    process.exit(1)
  }

  const constMap = loadConstants()
  const src = readFileSync(KEYWORDS_PATH, "utf8")
  const blocks = extractBlocks(src)
  const rawEntries = blocks.flatMap((b) => b.entries)
  const resolvedEntries = rawEntries.map((r) => resolveEntry(r, constMap))
  const resolvedUnique = new Set(resolvedEntries.map((k) => k.toLowerCase()))

  // (a) baseline verbatim preservation
  const baselineLines = readFileSync(BASELINE_PATH, "utf8").split("\n").filter((l) => l.length > 0)
  const baselineCheck = checkBaselinePreservation(baselineLines, rawEntries)
  if (baselineCheck.count !== EXPECTED_BASELINE_LITERALS) {
    failures.push(
      `baseline literal count ${baselineCheck.count} ≠ ${EXPECTED_BASELINE_LITERALS} (wrong snapshot?)`,
    )
  }
  if (baselineCheck.missing.length > 0) {
    failures.push(
      `${baselineCheck.missing.length} baseline literal(s) no longer present verbatim in lib/seo-keywords.ts:`,
      ...baselineCheck.missing.map((l) => `    MISSING: ${l}`),
    )
  }

  // (b) visible-surface domain hygiene
  const seoMetaSrc = readFileSync(SEO_META_PATH, "utf8")
  let filter
  try {
    filter = deriveVisibleFilter(seoMetaSrc, constMap)
  } catch (err) {
    failures.push(`cannot derive visible filter: ${err.message}`)
    filter = { regexes: [], hostTokens: [] }
  }
  const hygiene = checkVisibleHygiene(resolvedEntries, filter)
  if (hygiene.violations.length > 0) {
    failures.push(
      `${hygiene.violations.length} domain-shaped token(s) leak into visible keywords ` +
        `(buildVisibleKeywords filter in lib/seo-metadata.ts too weak — harden it):`,
      ...hygiene.violations.map((k) => `    LEAK: ${JSON.stringify(k)}`),
    )
  }
  if (hygiene.floorViolations.length > 0) {
    failures.push(
      `${hygiene.floorViolations.length} visible token(s) match the \\.com|\\.net|http gate floor`,
    )
  }
  const rerunBlock = blocks.find((b) => b.name === RERUN_VISIBLE_BLOCK)
  if (rerunBlock) {
    const rerunLeaks = rerunBlock.entries.filter((e) => DOMAIN_SHAPE.test(e))
    if (rerunLeaks.length > 0) {
      failures.push(
        `${rerunLeaks.length} host-shaped token(s) inside visible block ${RERUN_VISIBLE_BLOCK} ` +
          `(route them to the meta-only HOST block):`,
        ...rerunLeaks.map((k) => `    LEAK: ${k}`),
      )
    }
    notes.push(`${RERUN_VISIBLE_BLOCK}: ${rerunBlock.entries.length} entries, domain-shape clean`)
  } else {
    notes.push(`${RERUN_VISIBLE_BLOCK}: block not present (no rerun keywords added yet)`)
  }

  // report
  console.log("verify-keyword-preservation — gate run")
  console.log(`  blocks: ${blocks.map((b) => `${b.name}(${b.entries.length})`).join(", ")}`)
  console.log(`  total literals: ${rawEntries.length} · merged unique: ${resolvedUnique.size}`)
  console.log(
    `  baseline: ${baselineCheck.count} literals — ` +
      (baselineCheck.missing.length === 0 ? "all verbatim preserved" : `${baselineCheck.missing.length} MISSING`),
  )
  console.log(
    `  visible derivation: ${hygiene.visible.length} visible / ${resolvedEntries.length} total — ` +
      (hygiene.violations.length === 0 ? "zero domain-shaped tokens" : `${hygiene.violations.length} LEAKS`),
  )
  console.log(`  visible filter: ${filter.regexes.length} regex(es), ${filter.hostTokens.length} host token(s)`)
  for (const n of notes) console.log(`  note: ${n}`)

  if (failures.length > 0) {
    console.error("\nFAIL:")
    for (const f of failures) console.error(`  ${f}`)
    process.exit(1)
  }
  console.log("\nPASS: keyword preservation + visible-domain hygiene verified")
}

/* ------------------------------------------------------------------ */
/* Mode: --self-test (negative tests)                                  */
/* ------------------------------------------------------------------ */

function runSelfTest() {
  const failures = []
  let passed = 0
  const assert = (cond, name) => {
    if (cond) {
      passed += 1
      console.log(`  ok  ${name}`)
    } else {
      failures.push(name)
      console.log(`  FAIL ${name}`)
    }
  }

  const cm = {
    SITE_DISPLAY_NAME: "RaiseRight",
    PROJECT_DISPLAY_NAME: "RaiseRight",
    DEFAULT_SITE_TITLE: "Login | RaiseRight",
    SITE_ORIGIN: "https://www.raise-rights.com",
    CANONICAL_HOST: "www.raise-rights.com",
  }

  // 1. extraction: comments/blank lines inside arrays are not entries
  const blocks = extractBlocks(
    'export const A = [\n  "x",\n  // comment\n  "y",\n] as const\n\nexport const B = [\n  "z",\n] as const\n',
  )
  assert(
    blocks.length === 2 && blocks[0].entries.length === 2 && blocks[1].entries.length === 1,
    "extractBlocks skips comments and splits blocks",
  )

  // 2. resolution: template literal, bare identifier, replace() expr
  assert(
    resolveEntry("`${CANONICAL_HOST} Sign In`", cm) === "www.raise-rights.com Sign In",
    "resolveEntry resolves template literal",
  )
  assert(resolveEntry("SITE_DISPLAY_NAME", cm) === "RaiseRight", "resolveEntry resolves bare identifier")
  assert(
    resolveEntry('CANONICAL_HOST.replace(/^www\\./, "")', cm) === "raise-rights.com",
    "resolveEntry resolves replace() expression",
  )
  assert(resolveEntry('"plain literal"', cm) === "plain literal", "resolveEntry resolves string literal")

  // 3. NEGATIVE: deletion is detected
  const missing = checkBaselinePreservation(['"a"', '"b"', '"c"'], ['"a"', '"c"'])
  assert(missing.missing.length === 1 && missing.missing[0] === '"b"', "negative: deleted baseline literal detected")

  // 4. NEGATIVE: edited literal is detected (verbatim requirement)
  const edited = checkBaselinePreservation(['"RaiseRight login"'], ['"raise right login!"'])
  assert(edited.missing.length === 1, "negative: edited baseline literal detected")

  // 5. NEGATIVE: domain token leak into visible is detected (gate floor \.com|\.net|http)
  const weakFilter = { regexes: [], hostTokens: ["raise-rights.com"] }
  const leak = checkVisibleHygiene(["raiseright.com login", "scrip login"], weakFilter)
  assert(
    leak.violations.length === 1 && leak.violations[0] === "raiseright.com login",
    "negative: domain-token visible leak detected (weak filter)",
  )
  assert(leak.floorViolations.length === 1, "negative: \\ .com|\\.net|http gate-floor violation detected")

  // 6. NEGATIVE: alt-TLD host leak (com.shopwithscrip.app) is detected by DOMAIN_SHAPE
  const hostLeak = checkVisibleHygiene(["com.shopwithscrip.app login", "scrip login"], weakFilter)
  assert(hostLeak.violations.length === 1, "negative: alt-TLD host leak detected")

  // 7. NEGATIVE: a weak derivation (no domain regex in buildVisibleKeywords) fails the gate
  const weakMeta =
    "export function buildVisibleKeywords(): string[] {\n" +
    "  return SITE_KEYWORDS.filter((k) => !VISIBLE_HOST_TOKENS.some((h) => k.toLowerCase().includes(h)))\n" +
    "}\n" +
    "const VISIBLE_HOST_TOKENS = [\n  CANONICAL_HOST.toLowerCase(),\n]"
  const weakDerivation = deriveVisibleFilter(weakMeta, cm)
  const weakResult = checkVisibleHygiene(["login.raiseright.com sign in", "scrip login"], weakDerivation)
  assert(weakDerivation.regexes.length === 0, "negative: weak derivation exposes zero domain regexes")
  assert(weakResult.violations.length === 1, "negative: weak derivation leaks host token — gate catches it")

  // 8. POSITIVE control: hardened derivation keeps domain tokens meta-only
  const strongMeta =
    "export function buildVisibleKeywords(): string[] {\n" +
    "  return SITE_KEYWORDS.filter((k) => !/(?:https?:\\/\\/|www\\.|[a-z0-9-]+\\.(?:com|net|org|app|io|co|us|edu|gov|info|biz|shop|store|online)\\b)/i.test(k) && !VISIBLE_HOST_TOKENS.some((h) => k.toLowerCase().includes(h)))\n" +
    "}\n" +
    "const VISIBLE_HOST_TOKENS = [\n  CANONICAL_HOST.toLowerCase(),\n]"
  const strongDerivation = deriveVisibleFilter(strongMeta, cm)
  const strongResult = checkVisibleHygiene(
    ["login.raiseright.com sign in", "com.shopwithscrip.app login", "support.raiseright.com help center", "scrip login"],
    strongDerivation,
  )
  assert(strongDerivation.regexes.length === 1, "positive: hardened derivation exposes domain regex")
  assert(
    strongResult.violations.length === 0 && strongResult.visible.length === 1,
    "positive: hardened derivation keeps domain tokens out of visible set",
  )

  // 9. NATURAL PHRASE CONTROL: filter must not eat domain-free phrases
  const natural = checkVisibleHygiene(
    ["gift card fundraising", "RaiseRight enrollment code", "shopwithscrip website", "scrip gift card program"],
    strongDerivation,
  )
  assert(
    natural.violations.length === 0 && natural.visible.length === 4,
    "positive: natural phrases survive the hardened filter",
  )

  console.log(`\nself-test: ${passed} passed, ${failures.length} failed`)
  if (failures.length > 0) process.exit(1)
}

/* ------------------------------------------------------------------ */

const mode = process.argv[2] ?? ""
if (mode === "--write-baseline") writeBaseline()
else if (mode === "--self-test") runSelfTest()
else if (mode === "" || mode === "--run") runGate()
else {
  console.error(`unknown mode: ${mode} (use --write-baseline | --self-test | --run)`)
  process.exit(1)
}
