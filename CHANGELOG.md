# ARCHITECT — Full Changelog
**Hudson & Perry's Drift Law**
© 2026 Hudson & Perry Research
𝕏 @RaccoonStampede (David Hudson) · 𝕏 @Prosperous727 (David Perry)

---

## V1.5.13
- P1: Math tunables now persist across reloads — mathTfidf/Jsd/Len/Struct/Persist/RepThresh, mathKalmanR/SigP, mathRagTopK, mathMaxTokens, SDE param overrides, and postAuditThresh were all missing from hpdl_config save/restore.
- P2: liveDamping dead code removed — was `1/(1+userKappa)` declared but never referenced.
- P3: Eight truncated `// V1.` comment stubs replaced with proper descriptions throughout the file.
- P4: cap_eff wrapped in useMemo([harnessMode, mathEpsilon]) — was recalculated every render.
- P5: contextPruned wrapped in useMemo([messages]) — messages.filter() no longer runs every render.

---

## V1.5.12
- N1: Rewind "prev" button now compares against turnSnapshots[0]?.turn (oldest in buffer) not hardcoded 1. After turn 20 buffer rolls — prev was staying enabled and silently doing nothing below buffer floor.
- N2: downloadResearch now accepts cfg and uses preset healthDriftWeight/BSigWeight/HSigWeight. CSV health column now matches live session health for MEDICAL/CREATIVE/RESEARCH presets.
- N3: beforeunload effect added — flushes researchNotesRef.current to hpdl_notes_flush storage key on tab close. Recovered on next mount. Prevents notes typed but never blurred from being lost.
- N4: ScoreBadge extracted above main component — was a function component defined inline causing React to see a new component type on every render.
- N5: liveSDEOverride wrapped in useMemo — was a plain object spread rebuilt every render, causing sendMessage to always receive a new reference.
- N6: harnessChangeLog wrapped in useMemo([coherenceData]) — .map().filter() chain no longer runs every render.

---

## V1.5.11
- Stale V1.5.8 version string fixed in ACTIVE preset display line in TuneModal.
- cfg memoized — was `PRESETS[activePreset] ?? PRESETS.DEFAULT` as a plain expression every render, producing a new reference and causing sendMessage to invalidate on every render regardless of whether the preset changed.

---

## V1.5.10
- H1: Rewind "next" button fixed — was comparing rewindTurn vs turnSnapshots.length (always 20 after rolling cap). Now compares against turnSnapshots[turnSnapshots.length-1]?.turn (actual max turn in buffer).
- H2: RESEARCH export reads researchNotesRef.current || researchNotes — unblurred notes no longer silently lost in export.
- M2: Live coherence weight sum display in MATH tab — shows Σ = X.XXX, green ✓ when ~1.0, amber ⚠ with explanation when off. Replaces static "should sum to 1.0" text. Weights are independent multipliers; sum of 1.0 is recommended not enforced.

---

## V1.5.9
- B: Typing bug — onChange replaced with onInput (fires after DOM commit, safer in iframe sandbox). onCompositionEnd added for IME/CJK/iOS handling. setHasInput now guarded — only fires when boolean actually changes (hasVal !== hasInput), preventing re-renders on mid-word keystrokes.
- A: DisclaimerModal duplicate onClick removed — dead first handler on accept button.
- C: researchNotes textarea converted to uncontrolled — onBlur updates state, onInput updates ref. Stops keystroke-triggered re-renders when NOTES panel is open.
- D: S styles object wrapped in useMemo([harnessMode]) — was 62-line object literal rebuilt on every render. Only currentMode.color changes, which depends solely on harnessMode.
- Grok-4: buildPipeInjection now accepts cfg param and reads cfg.varDecoherence/varCaution/varCalm. Pipe directives now respond to preset thresholds.

---

## V1.5.8
- React Context migration — TuneCtx (30+ tune params) and SessionCtx (session/modal state) replace 30+ prop-drilling chains. Modal call sites reduced to zero-prop <TuneModal /> etc.
- Context values memoized — TuneCtx and SessionCtx both wrapped in useMemo. Modals only re-render when their specific slice of state changes.
- Declaration order fix — context values placed after all useCallback declarations. Previously caused "cannot access toggleBookmark before initialization" on mount.
- 7 modal sub-components all verified stable with zero-prop call sites.

---


## V1.5.7
- Text contrast increased throughout light theme (all mid/dim/faint tokens darkened)
- resetSession now clears textarea DOM, inputValueRef, and hasInput state
- Feature toggle OFF row background fixed (#0A0A0A → #F4F4F8 in light theme)
- Misplaced MAIN COMPONENT comment banner removed
- Inline hardcoded hex colors consolidated toward THEME tokens
- JSX header stripped of verbose patch notes → moved here

---

## V1.5.6
- P37: Typing-in-textarea bug fixed — controlled `input` state replaced with `hasInput` boolean + uncontrolled textarea. Eliminates full-component re-render on every keystroke.
- P38: Light/daytime theme. THEME constant with 35 semantic tokens. S styles rewritten. ~50 inline hexes replaced. Chart, modals, scrollbar, keyframes all updated.
- P39: Monolith split Phase 1 — 7 modals extracted to React.memo sub-components (1175 lines out of main render). ExportContentModal, DisclaimerModal, TuneModal, RewindConfirmModal, LogModal, BookmarksModal, GuideModal.

---

## V1.5.5
- P33: applyZeroDriftLock (200-iter loop) — lockStatus and exportBlock both wrapped in useMemo.
- P34: URL.revokeObjectURL removed from removeAttachment — was no-op on data URIs.
- P35: processFiles catch now logs console.error for devtools visibility.
- P36: MATH tab ↺ reset buttons — was setter(val) (no-op). Now setter(def) with correct defaults.

---

## V1.5.4
- P28: `input` removed from sendMessage dep array — read via inputValueRef. Was recreating callback on every keystroke.
- P29: buildTfIdf + buildTermFreqDist merged into one canonical buildTermFreq().
- P30: 2-doc IDF design documented inline — intentional vocabulary-shift measurement.
- P31: Mute word limit corrected — was cap/8 (~15 words), now cap*0.75 (~90 words at 120 tokens).
- P32: corrections state documented — it is the FALSE+ false-positive tracking system in LOG modal.

---

## V1.5.3
- P18–P20: Removed USE_MUTE_MODE / USE_DRIFT_GATE / USE_PIPING internal guards from helper functions. Call sites (featMute, featGate, featPipe) are the live gates.
- P21: sendMessage muteTriggered/gateTriggered now use featMute/featGate state, not boot constants.
- P22: updateSmoothedVariance takes cfg param — preset GARCH values (omega/alpha/beta) now actually apply.
- P23: driftLawCapEff/driftLawFloor take epsilon param — mathEpsilon wired to cap_eff, chartData, MATH tab.
- P24: Snapshot lock888Achieved uses cfg.lock888Streak — CREATIVE/RESEARCH/MEDICAL now correct.
- P25: hpdl_data save — eventLog added to deps. Prevents mismatched state after rewind + navigate.
- P26: API key warn fires for ALL non-sandbox origins (was missing Vercel/Netlify).
- P27: deleteTurn dep array adds cfg (required for cfg GARCH pass).

---

## V1.5.2
- P1: Version strings unified.
- P2: Config save dep array — nPaths/postAuditMode/customMutePhrases/researchNotes were missing.
- P3: corrections persistence — loaded from hpdl_data but never saved back.
- P4: Rewind index bug — was turnSnapshots[clickedTurn-1], broke after turn 20. Fixed to .find(s=>s.turn===n).
- P5: Bookmarks save immediately on toggle.
- P6: rewindConfirm cleared in resumeLive — stale dialog could linger.
- P7: Post-audit scores against finalMessages (includes new reply). Was using same inputs as rawScore so delta was always ~0.
- P8: finalDriftCount moved before meta-harness block — single source of truth.
- P9: deleteTurn variance uses updateSmoothedVariance (GARCH blend) — prevents discontinuity after deletion.
- P10: corrections removed from sendMessage dep array.
- P11: HC_MASS_LOSS aliased to KAPPA.
- P12: pruneThreshold/pruneKeep state behavior documented — only active in CUSTOM mode.
- P13: chartData wrapped in useMemo.
- P14: PRECOMPUTED_PATHS note added.
- P15: API key warning sandboxed correctly.
- P16: statusMessage state added — rewind/delete status separated from file errors.
- Cleanup: Removed jaccardSimilarity(), VAR_SMOOTH_ALPHA, p50 in sdePercentilesAtStep, PRECOMPUTED_PATHS.

---

## V1.5.0
- SDE path count tunable (nPaths 10–1000, default 50)
- Post-audit mode (Off / Light / Full / Custom) — second coherence pass after generation
- Token estimate display, tightened thresholds (40k amber / 70k red)
- Mute phrase editor in TUNE panel
- Bookmark notes annotation field
- Health penalty weights exposed in CUSTOM preset config
- Feature toggle state included in EXPORT block
- window.storage two-key split (hpdl_config + hpdl_data)
- Research Export CSV with session UUID
- localStorage → window.storage migration

---

## V1.4.x
- V1.4.8: κ & ANCHOR user-adjustable, R&D disclaimer, legal notice
- V1.4.7: Industry presets, 11 feature toggles, TUNE modal
- V1.4.6: Adaptive sigma EWMA, rate slider
- V1.4.5: LOCK_888 avg C floor, B/H health penalties
- V1.4.4: Bookmarks
- V1.4.3: driftCount decay
- V1.4.2: Error logging, pipe self-awareness
- V1.4.1: Restored missing handleCopyExport
- V1.4.0: GARCH, JSD, H-sigs, B-sigs, session health, rewind

---

## V1.3
- TF-IDF coherence scoring
- Mute mode startsWith detection
- Snapshot cap (rolling 20)
