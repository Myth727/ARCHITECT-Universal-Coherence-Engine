# ARCHITECT — Universal Coherence Engine

## Full-stack inference-time LLM stability and intelligence layer

**V2.1** · © 2026 Hudson & Perry Research
**Authors:** David Hudson ([@RaccoonStampede](https://x.com/RaccoonStampede)) · David Perry ([@Prosperous727](https://x.com/Prosperous727))
**License:** MIT · [Live Demo](https://architect-universal-coherence-engin.vercel.app/)

> ⚠ RESEARCH & DEVELOPMENT — NOT FOR CLINICAL OR LEGAL USE.
> All outputs are mathematical proxy indicators. No warranty expressed or implied.

---

## There is one file: `ARCHITECT.jsx`

It runs two ways depending on how you use it.

---

## ▶ Option 1 — Paste into Claude (instant, no setup)

**1.** Download `ARCHITECT.jsx` from the root of this repo

**2.** Open [claude.ai](https://claude.ai) and start a new conversation

**3.** Paste this:
```
Create an artifact from this file. Run it exactly as-is.
[paste the full contents of ARCHITECT.jsx]
```

Works immediately. No account, no server, no install.

**What you get:** Full ARCHITECT with coherence scoring, Kalman filter, GARCH, SDE bands, all signal detection, all presets, AutoTune, feedback loop, reflexive analysis, knowledge anchors, display preferences, session rewind, research export.

---

## ▶ Option 2 — Deploy on Vercel (V2.1, any browser)

**Live demo:** [architect-universal-coherence-engin.vercel.app](https://architect-universal-coherence-engin.vercel.app/)

The same `ARCHITECT.jsx` lives at `components/ARCHITECT.jsx` inside the Next.js project. Vercel activates the extra capabilities that require a server and Web Worker.

**Additional features on Vercel:**
- **Semantic coherence scoring** — all-MiniLM-L6-v2 ONNX neural embeddings (~23MB, cached in IndexedDB). Meaning-based, not word-based.
- **Unscented Kalman Filter (UKF)** — sigma-point propagation handles nonlinear drift dynamics
- **Multi-provider** — Anthropic, OpenAI, or Grok. Your key, your choice.
- **Key persistence** — API key saved to browser. Type it once.
- **Works on any device** — no Claude account needed

### Deploy your own instance

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your fork
3. Vercel auto-detects Next.js → tap **Deploy**
4. No environment variables needed — users provide their own API keys

### Project structure

```
ARCHITECT.jsx              ← root copy — paste this into Claude
components/
  ARCHITECT.jsx            ← same file, used by Next.js
pages/
  index.tsx                ← mounts the app
  api/
    proxy.ts               ← multi-provider proxy (Anthropic · OpenAI · Grok)
public/
  embedder.worker.js       ← neural embedding Web Worker
sdk/
  *.ts                     ← TypeScript math library
```

---

## What ARCHITECT does

**Core engine:** Per-turn coherence scoring → Kalman-smoothed trajectory → GARCH(1,1) variance modeling → Monte Carlo SDE uncertainty bands → pipe injection → post-audit loop → drift escalation → corrective directives.

**V2.1 intelligence layer:** AutoTune selects optimal generation parameters per turn based on context detection. Feedback loop learns your preferences via EMA across sessions. Reflexive analysis sends session coherence data to the LLM and returns concrete configuration improvements. Knowledge anchors calibrate drift detection to your domain.

**Signal detection:** 6 hallucination proxies (H-signals), 7 behavioral proxies (B-signals), EWMA trend tracking, semantic anchor distance monitoring, Integrity Floor breach detection.

---

## Feature Comparison

| Feature | Option 1 (Claude) | Option 2 (Vercel) |
|---|:---:|:---:|
| TF-IDF + JSD coherence scoring | ✓ | ✓ fallback |
| Semantic embeddings (all-MiniLM-L6-v2) | — | ✓ |
| Linear Kalman filter | ✓ | — |
| Unscented Kalman Filter (UKF) | — | ✓ |
| GARCH(1,1) + jump-diffusion | ✓ | ✓ |
| Monte Carlo SDE bands | ✓ | ✓ |
| EWMA + Anchor chart lines | ✓ | ✓ |
| AutoTune (per-turn context detection) | ✓ | ✓ |
| Feedback loop (EMA learning) | ✓ | ✓ |
| Reflexive session analysis | ✓ | ✓ |
| Knowledge Anchors (domain calibration) | ✓ | ✓ |
| Display preferences (theme, font, compact) | ✓ | ✓ |
| H-signals + B-signals | ✓ | ✓ |
| Session health, rewind, RAG | ✓ | ✓ |
| Integrity Floor | ✓ | ✓ |
| Framework Mode (HUDSON / STANDARD) | ✓ | ✓ |
| Multi-provider (OpenAI, Grok) | — | ✓ |
| API key persistence | — | ✓ |
| Works without Claude account | — | ✓ |

---

## Industry Presets

| Preset | Dec / Cau / Calm | Best For |
|---|---|---|
| DEFAULT | 0.200 / 0.120 / 0.080 | General use |
| TECHNICAL | 0.180 / 0.100 / 0.060 | Code, audits, engineering |
| CREATIVE | 0.280 / 0.160 / 0.100 | Writing, brainstorming |
| RESEARCH | 0.220 / 0.130 / 0.085 | Academic, long-form analysis |
| MEDICAL | 0.150 / 0.090 / 0.055 | High-stakes clinical/legal |
| **CIRCUIT** | **0.140 / 0.080 / 0.050** | **Logic verification** |
| CUSTOM | user-defined | Fully configurable |

---

## Advanced / Experimental (opt-in, consent required)

All behind **TUNE → ⚗ ADVANCED**. Labeled experimental.

- **Alt SDE Models** — CIR or Heston stochastic volatility
- **Custom Rails** — behavioral guidelines injected into every prompt
- **Stability Panel** — convergence tracking toward RESONANCE_ANCHOR
- **Edit Constants** — tune κ (0.00–5.00), live λ=1/(1+κ) display
- **MHT Study** — Metatron-Hudson Theory SDE module
- **Poole Manifold CA Sim** — 3D cellular automaton, full adder truth table
- **Integrity Floor** — DRIFT vs INTEGRITY BREACH threshold detection

---

## SDK (TypeScript)

```typescript
import { computeCoherence, kalmanStep, updateSmoothedVariance,
         buildPipeInjection, PRESETS } from './sdk/index';

const cfg    = PRESETS.CIRCUIT;
const score  = computeCoherence(response, history);
const newVar = updateSmoothedVariance(scoreHistory, prev, cfg);
const kalman = kalmanStep(state, score, turn * (2*Math.PI/12), SDE_PARAMS);
const pipe   = buildPipeInjection(newVar, kalman.x, kalman.P,
                 calmStreak, driftCount, 'audit', turn, 0, 0, null, cfg);
```

---

## Citation

```
Perry, D. & Hudson, D. (2026). ARCHITECT: Universal Coherence Engine.
Hudson & Perry Research. @RaccoonStampede · @Prosperous727
github.com/Myth727/ARCHITECT-Universal-Coherence-Engine
```

---

*© 2026 Hudson & Perry Research — Experimental R&D. All outputs are proxy indicators.*
