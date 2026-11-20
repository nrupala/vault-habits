# Codetopo Profile — Vault Habits (nrupala/vault-habits)

**What this is.** The agent-facing map of this repository, generated with
Codetopo 0.9.1 (local engine, `~/.cargo/bin/codetopo`) so an arriving agent
can see the machine — topology, trust boundaries, money surface — before it
submits or changes anything. Read this first; the graph snapshot beside it
(`snapshot.json`, `stats.json`) is the measured evidence.

- **Repo:** nrupala/vault-habits
- **Commit profiled:** `e83005caa4af9e3dab47c63cbf49033e877ead46` (main)
- **Engine:** codetopo 0.9.1 + full-language program (engine built from codetopo main `d71509d1` — all sixteen program extractors merged) · index run 2026-11-19
- **Graph:** 57 files walked · 0 failed · 773 nodes · 1,417 edges · audit chain valid (3 entries, head `9ae3e69f…f542`)
- **Nodes by kind:** external 510 · variable 71 · file 57 · module 55 · function 29 · interface 20 · doc 14 · class 8 · method 8 · package 1
- **Edges by kind:** calls 696 · contains 262 · reads 219 · defines 141 · imports 96 · writes 2 · inherits 1

## Coverage honesty

**Re-profiled 2026-11-19** with the full-language engine (Codetopo extractor program, 2026-11-18 ruling): every language this repo is written in is now extracted at symbol level. First profile: 2026-11-18 (Codetopo 0.9.1).

Codetopo now extracts every language in the full-language program (Rust, TypeScript/JavaScript, Python, Kotlin, C, Java, Go, Shell, C++, Swift, Ruby, R, Julia, C#, PHP, Scala, Haskell, Elixir, Lua), plus Markdown as Doc nodes. The TypeScript/React app is extracted at symbol level as before, and the Capacitor native scaffolding named as the residual in the first profile is now in the graph: the Java `MainActivity` and test classes under `android/app/src/` and the Swift `AppDelegate` under `ios/App/App/`. Gradle/XML/plist/storyboard files are configuration, not code, and are not parsed; read them directly. Symbol coverage of the codebase is complete.
## Topology

Single-app repo (`@vault/habits`): the focused habits app — private consistency tracking — cut from the same vault core as the parent suite.

- `src/App.tsx` + `src/components/AppShell.tsx` — React shell; `HabitsApp.tsx` is the product surface, with the shared suite components (`NotesApp.tsx`, `TasksApp.tsx`, `LedgerApp.tsx`, `CalendarApp.tsx`, `AnalyticsApp.tsx`) carried in the same tree.
- `src/lib/core/` — the vault engine: `crypto.ts` (AES-256-GCM), `db.ts` (local persistence), `useVault.ts` / `useItems.ts` / `useSettings.ts`, `useVoiceCommands.ts`, `intelligence.ts`. Tests: `src/tests/crypto.test.ts`, `stress.test.ts`.
- `src/main.tsx` — entry point; `android/` + `ios/` are Capacitor native shells; the Vite web build is the product.

## Trust boundaries

- **Local-only, zero-knowledge:** habit data is encrypted on-device (`src/lib/core/crypto.ts`); no account, auth server, session or token store exists in this repo — credential-term greps hit only vault-crypto code and docs.
- **No network trust boundary in the shipped app:** data stays in local storage under the vault key; adding any sync/account layer is a design change to the stated trust model, not a patch.
- **Blast radius:** `crypto.ts` and `db.ts` — every read/write passes through them (668 call edges in the graph).

## Money surface

**No money surface found.** Greps for `stripe|paddle|checkout|billing` over all TypeScript/TSX/JS source returned no hits; there is no upgrade/license module in this repo (unlike the parent vault-tracker), no payment SDK in `package.json`, and no checkout or webhook code at the profiled commit.

## How an agent should approach

1. Read `README.md`, then this profile, then the snapshot.
2. Use `codetopo` queries against the snapshot (descendants, blast-radius,
   symbol) before editing — especially around the hubs named above.
3. Do not add credentials, account identifiers or key material to any file
   here — names and paths only. Respect the trust boundaries above as
   design constraints, not suggestions.
4. Run the repo's own tests after any change; regenerate this profile
   (below) whenever the code changes.

## Regeneration

`docs/codetopo-profile/refresh.sh` (in this pack) re-downloads the repo
at a named ref, re-runs the index, and rewrites `snapshot.json`,
`stats.json` and the header block inputs of this profile. Regenerate at
every release / material change.

Release gate: NOT RUN — Guardian Mesh: NOT RUN (this profile pack is a
documentation artifact; it is not a release-gate or Guardian Mesh verdict).
