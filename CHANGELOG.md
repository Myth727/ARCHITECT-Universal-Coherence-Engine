# ARCHITECT — Full Changelog
**Hudson & Perry's Drift Law**
© 2026 Hudson & Perry Research
𝕏 @RaccoonStampede (David Hudson) · 𝕏 @Prosperous727 (David Perry)

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
