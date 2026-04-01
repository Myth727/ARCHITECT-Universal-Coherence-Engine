# ARCHITECT — Real-Time AI Coherence Harness

## by Hudson \& Perry · Real-Time LLM Monitoring

**Version 1.5.35** · © 2026 Hudson & Perry Research
**Authors:** David Hudson ([@RaccoonStampede](https://x.com/RaccoonStampede)) & David Perry ([@Prosperous727](https://x.com/Prosperous727))
**License:** MIT

> ⚠ RESEARCH & DEVELOPMENT — NOT FOR CLINICAL OR LEGAL USE.
> All outputs are mathematical proxy indicators. No warranty expressed or implied.
>
> **Active development note:** This project is under continuous iteration. Some features — particularly those in the ⚗ Advanced tab — are experimental and may have rough edges. Mobile UI scrolling and certain toggle behaviors are known areas of ongoing improvement. If you encounter issues, the FEATURES and MATH tabs are fully functional on all devices.

---

## ▶ Use it right now in Claude — 3 steps

The fastest way to run ARCHITECT is directly inside Claude as a single-file artifact. No installs, no setup.

**1. Download `ARCHITECT.jsx` from this repo**

**2. Open [claude.ai](https://claude.ai) and start a new conversation**

**3. Paste this message:**

```
Create an artifact from this file. Run it exactly as-is.
[paste the full contents of ARCHITECT.jsx]
```

That's it. The full coherence harness runs immediately in the artifact panel.

> **Tip:** Open **TUNE** to pick an industry preset (TECHNICAL, CREATIVE, MEDICAL etc.), then start chatting. The harness monitors every response in real time.

---

## What this is

A real-time coherence monitoring engine for LLM conversations. Every response is scored with TF-IDF + Jensen-Shannon Divergence, tracked with a Kalman filter, modeled with GARCH(1,1) variance, and fed back as corrective directives before the next turn.

**What's confirmed and validated:**

- **Kalman filter** — time-varying, κ-damped trajectory smoothing
- **GARCH(1,1) variance** — volatility clustering, per-preset tunable
- **TF-IDF + JSD coherence scoring** — 5-component weighted scoring
- **Pipe injection** — corrective directives fed into every system prompt
- **Behavioral signal detection** — 6 proxies (sycophancy, hype, topic hijack, etc.)
- **Hallucination signal detection** — 3 proxies with preset-aware thresholds
- **Session health** — 0–100 composite score with per-preset penalty weights
- **Industry presets** — DEFAULT / TECHNICAL / CREATIVE / RESEARCH / MEDICAL / CUSTOM
- **RAG memory** — retrieve-augment from session history
- **Rewind** — restore any prior session state from a 20-turn buffer
- **Research export** — CSV + JSONL per-turn metrics for offline analysis

**Advanced / experimental (opt-in, clearly labeled):**

- Alternative SDE models: CIR (Cox-Ingersoll-Ross), Heston stochastic volatility
- Custom Rails — user-defined behavioral guidelines injected into every prompt
- Additional experimental math parameters

Advanced features are behind an explicit unlock gate in TUNE → ⚗ ADVANCED. They are labeled as experimental and unvalidated.

---

## Repository structure — a note

> This repo is actively being organized. The TypeScript SDK files (`constants.ts`, `coherence.ts`, `drift.ts`, `engine.ts`, `signals.ts`, `sde.ts`, `storage.ts`, `index.ts`) are currently in the root of the main branch rather than in a proper `/sdk` folder. This is a known structural issue and will be corrected in an upcoming reorganization. Apologies for the messiness — this project was built collaboratively and iteratively, and GitHub organization is still catching up with the pace of development.

The core tool — `ARCHITECT.jsx` — is always current and fully functional regardless of SDK folder structure.

---

## ARCHITECT V1.5.35 — What's New

- **CIRCUIT Preset** — new industry preset tuned for logic verification and cascading AI reasoning chains. Tightest variance tolerance, most aggressive drift escalation.
- **Poole Manifold CA Simulator** — 3D cellular automaton in Advanced tab. Adjustable B/S params, live canvas, full adder truth table (8/8 Turing completeness verification).
- **Circuit Signal** — live full adder pass rate shown in the metrics sidebar when Poole CA is active.
- **SDE Path Visualization** — toggle to render faint OU ensemble paths on the coherence chart. Opacity control in DISPLAY tab. Color matches active preset.
- **MHT Study Module** — Metatron-Hudson Theory SDE study panel in Advanced tab. Robitaille Helix invariants, H_drift annihilator params, live computed values.
- **DATL Heartbeat** — N(t) scar-swarm and Δ_heartbeat live display in MHT section.
- **Advanced Tab fully functional** — five independent feature toggles (Alt SDE, Custom Rails, Stability Panel, Edit Constants, MHT Study, Poole CA Sim). Each config section appears only when its toggle is on.
- **MessageBubble memoized** — React.memo with custom equality. Previous messages no longer re-render on every keystroke or streaming token.
- **Mobile scroll fixed** — TUNE modal scroll container now wraps all tabs correctly. Range inputs replaced with number inputs in Advanced tab (Android WebView compatibility).
- **All pseudoscience/experimental framing** hidden behind Advanced tab consent gate. Standard UI is clean and credible.

See `CHANGELOG.md` for the complete version history (V1.3 → V1.5.35).

---

## SDK (TypeScript)

The math functions are also available as a standalone TypeScript package with no UI dependencies. See the `.ts` files in the root (to be reorganized into `/sdk` soon).

```bash
# Not yet published to npm — clone and build locally
git clone https://github.com/Myth727/Real-Time-LLM-Coherence-Harness-SDE-Bands-Zero-Drift-Lock-
npm install && npm run build
```

---

## SDK Quick Start

```typescript
import { computeCoherence, kalmanStep, updateSmoothedVariance,
         buildPipeInjection, PRESETS } from './index';

const cfg    = PRESETS.TECHNICAL;
const score  = computeCoherence(response, history);
const newVar = updateSmoothedVariance(scoreHistory, prev, cfg);
const kalman = kalmanStep(state, score, turn * (2*Math.PI/12), SDE_PARAMS);
const pipe   = buildPipeInjection(newVar, kalman.x, kalman.P,
                 calmStreak, driftCount, 'audit', turn, 0, 0, null, cfg);
const systemPrompt = basePrompt + pipe;
```

---

## Core Constants

```typescript
EPSILON  // 0.05   — minimum coherence floor assumption
DAMPING  // 0.6925 — controls response smoothing in Kalman and SDE
```

> Advanced users can access and modify additional framework constants via **TUNE → ⚗ ADVANCED**. Modifying defaults operates outside the validated configuration.

---

## Citation

```
Perry, D. & Hudson, D. (2026). ARCHITECT: Real-Time AI Coherence Harness.
Hudson & Perry Research. @RaccoonStampede · @Prosperous727
Hudson & Perry Research. @RaccoonStampede · @Prosperous727
```

---

*© 2026 Hudson & Perry Research — Experimental R&D. All outputs are proxy indicators.*
