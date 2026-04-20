# ARCHITECT — Legacy Repository

> ## This project has been superseded by VECTOR
>
> **Current system:** https://github.com/Myth727/VECTOR  
>
> If you're arriving here for the first time, start with VECTOR.

---

## Status

ARCHITECT is no longer the active public line.

This repository is being retained as a **legacy reference** documenting an earlier phase of the system’s development.

It is not the current or recommended entry point.

---

## What changed

ARCHITECT evolved into a broader and more structured system now released as **VECTOR**.

The transition reflects a shift from:
- an isolated coherence/control framework  
→ to  
- a more complete system for observability, control, and evaluation of generative processes

All active work now continues under VECTOR.

---

## Where to go

→ https://github.com/Myth727/VECTOR

VECTOR is the current version and will continue to evolve.

---

## What this repository represents

ARCHITECT should be viewed as:
- an earlier implementation
- a research and experimentation phase
- a foundation that informed the current system

It may still be useful for:
- understanding system evolution  
- comparing architectural decisions  
- reviewing earlier approaches  

---

## Direction

This repository is no longer being actively developed.

All updates, improvements, and future work are focused on VECTOR.

→ https://github.com/Myth727/VECTOR

# ARCHITECT — Volatility-Sensitive Correction Engine

## A real-time control system for generative output stability. Detects instability, measures volatility, and corrects dynamically — while generation is still happening.

**Applicable to:** Language models · Software agents · Inference pipelines · Multimodal systems · Any sequential generative process

**V2.3** · © 2026 Hudson & Perry Research
**Authors:** David Hudson ([@RaccoonStampede](https://x.com/RaccoonStampede)) · David Perry ([@Prosperous727](https://x.com/Prosperous727))
**License:** MIT · [Live Demo](https://architect-universal-coherence-engin.vercel.app/)

> ⚠ RESEARCH & DEVELOPMENT — NOT FOR CLINICAL OR LEGAL USE.
> All outputs are mathematical proxy indicators. No warranty expressed or implied.

---

## What this actually is

Most generative systems produce outputs and hope for the best.

ARCHITECT treats sequential generation as what it actually is: a stochastic process that can destabilize. It measures volatility in real time, detects when the system is drifting toward degraded output, and injects corrective signals before the output degrades further.

That's not prompt engineering. That's a feedback control loop.

**The core loop:**
```
Score output → Estimate state (Kalman) → Track volatility (GARCH) →
Detect instability → Inject correction (u_drift) → Repeat
```

**What this means in practice:** When a generative system starts drifting — getting sycophantic, inflating claims, losing context, contradicting itself, producing hallucinated content — ARCHITECT catches it mathematically and corrects dynamically. Not after the fact. During.

---

## There is one file: `ARCHITECT.jsx`

It runs two ways.

---

## ▶ Option 1 — Paste into Claude (instant, no setup)

1. Download `ARCHITECT.jsx` from the root of this repo
2. Open [claude.ai](https://claude.ai) and start a new conversation
3. Paste: `Create an artifact from this file. Run it exactly as-is.` followed by the full file contents

Works immediately. No account, no server, no install.

---

## ▶ Option 2 — Deploy on Vercel (any browser, cross-session memory)

**Live demo:** [architect-universal-coherence-engin.vercel.app](https://architect-universal-coherence-engin.vercel.app/)

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your fork
3. Vercel auto-detects Next.js → tap **Deploy**

No environment variables needed. Users provide their own API keys.

**Vercel adds:**
- Semantic scoring — all-MiniLM-L6-v2 ONNX neural embeddings (~23MB, cached after first load)
- Unscented Kalman Filter (UKF) — sigma-point propagation for nonlinear dynamics
- Multi-provider — Anthropic, OpenAI, or Grok
- Cross-session persistence — pinned docs, feedback profiles, session memory survive browser restarts

---

## How it works

ARCHITECT runs a full signal-processing and control pipeline on every response turn.

**Volatility measurement:**
Every output is scored using TF-IDF + Jensen-Shannon Divergence — measuring how much vocabulary and semantics shifted from prior context. That score feeds a GARCH(1,1) model that tracks volatility clustering over time and a Kalman filter that smooths the trajectory into a reliable state estimate.

**Why this matters:** A single unusual output might be fine. The system asks: is volatility rising across multiple turns? Is the system in a high-variance regime? That's what GARCH catches that individual turn scoring misses.

**Detection:**
When volatility crosses thresholds, ARCHITECT fires signal detectors:

- **H-Signals (hallucination proxies):** High-confidence language under elevated variance. Low source consistency vs attached documents. Self-contradiction with prior turns. Low response entropy. High vocabulary novelty under instability.
- **B-Signals (behavioral proxies):** Sycophancy, hype inflation, roleplay drift, question flooding, topic hijack, unsolicited elaboration, phrase repetition.

All signals are proxy indicators. Honest framing enforced throughout.

**Correction:**
When instability is detected, ARCHITECT injects a corrective directive into the next system prompt — `u_drift(t)` in the SDE framework. The injection is proportional to the instability state. AUDIT mode detects only. MODERATE adds light correction. DEEP CLEAN and EXTREME apply progressively stronger constraints.

**The compressed pipe format (V2.1):**
```
[A|t7|v=0.142|st=CAU|kx=0.887|kp=0.0004|cl=2|dr=1|md=AUD|h=0|b=0]->CONSOLIDATE.[/A]
```
60-70% fewer tokens than the previous format. Identical information content.

---

## The Math

Built on established frameworks borrowed from physics, aerospace, and quantitative finance — applied here to generative output stability.

| Component | Origin | Function in ARCHITECT |
|---|---|---|
| SDE (OU process) | Physics / stochastic control | Models output trajectory evolution over time |
| GARCH(1,1) | Quantitative finance | Tracks volatility clustering across turns |
| Kalman filter | Aerospace / signal processing | Smooths noisy per-turn scores into reliable state estimate |
| TF-IDF + JSD | Information theory / NLP | Measures lexical shift and semantic drift per turn |
| Pipe injection | Control theory | u_drift(t) — corrective force applied to next output |
| Langevin noise (V2.3) | Spintronics / MTJ physics | Hardware-realistic stochastic uncertainty bands |

**Core equation:**
```
dε(t) = a(t)ε(t)dt + b·dW_t
a(t) = (α + β_p·sin(ωt)) / (1+κ)
κ = 0.444 (Hudson Constant, fixed)
```

---

## V2.3 — Langevin Noise Extension

The Wiener process in the SDE now uses a Langevin-weighted noise draw:

```
dW_t = b · √dt · z · η
η = √(1 + 1/(2Δ))
```

Δ (MTJ_DELTA) is the thermal stability factor from magnetic tunnel junction physics — Neel-Brown relaxation model (Brown 1963; Koch et al. 2000). Default Δ=50. At low Δ (10-25) the noise becomes meaningfully heavier-tailed, producing wider and more asymmetric Monte Carlo uncertainty bands in high-volatility regimes.

**Honest framing:** The Langevin math is physically grounded. The direct empirical link between MTJ parameters and generative output coherence is theoretical — same mathematical family, not yet co-validated against actual hardware. Empirical validation listed under Requires Validation in FRAMEWORK.md.

Toggle ON/OFF in FEATURES tab. Δ editable (range 10-200).

---

## Intelligence Layer (V2.1-V2.3)

| Feature | What it does |
|---|---|
| **AutoTune** | Detects session context per turn (code/creative/analytical/conversational/chaotic), selects optimal generation parameters automatically |
| **Feedback Loop** | +1/−1 per response. EMA learning personalizes AutoTune profiles. Persists across sessions. |
| **Reflexive Analysis** | Sends session volatility fingerprint for analysis → returns prioritized config suggestions |
| **Knowledge Anchors** | Domain vocabulary (Medical, Legal, Engineering, Finance, Research) calibrates signal detection to your field |
| **Persistent Doc Slots** | 3 pinned documents — injected every turn before harness, never pruned, never forgotten |
| **Session Memory** | Auto-compresses history at turns 10/20/30. Solves long-session context loss. |
| **META Panel** | Second analysis chat with full ARCHITECT architecture + live session data embedded. Ask "why did volatility spike at turn 7" — gets exact values. |
| **Quick Tools Drawer** | CALC (SDE/GARCH parameter calculator + expression evaluator), VERIFY (15 live session checks), EXPORT (CSV/JSONL/TXT) |

---

## Feature Comparison

| Feature | Claude artifact | Vercel |
|---|:---:|:---:|
| TF-IDF + JSD scoring | ✓ | ✓ fallback |
| Semantic embeddings (all-MiniLM-L6-v2) | — | ✓ |
| Linear Kalman filter | ✓ | — |
| Unscented Kalman Filter (UKF) | — | ✓ |
| GARCH(1,1) + jump-diffusion | ✓ | ✓ |
| Monte Carlo SDE bands | ✓ | ✓ |
| Langevin/MTJ noise model | ✓ | ✓ |
| AutoTune | ✓ | ✓ |
| Feedback loop (EMA learning) | ✓ | ✓ |
| Reflexive session analysis | ✓ | ✓ |
| Knowledge Anchors | ✓ | ✓ |
| Persistent Document Slots | ✓ session | ✓ cross-session |
| Strategic Session Memory | ✓ session | ✓ cross-session |
| META Panel | ✓ | ✓ |
| Quick Tools (CALC/VERIFY/EXPORT) | ✓ | ✓ |
| Display preferences (themes, font, compact) | ✓ | ✓ |
| H-signals + B-signals | ✓ | ✓ |
| Session rewind, RAG, bookmarks | ✓ | ✓ |
| Integrity Floor | ✓ | ✓ |
| Multi-provider (OpenAI, Grok) | — | ✓ |
| API key persistence | — | ✓ |
| Works without Claude account | — | ✓ |

---

## Presets

Tuned parameter profiles for different output stability requirements.

| Preset | Dec / Cau / Calm | Best For |
|---|---|---|
| DEFAULT | 0.200 / 0.120 / 0.080 | General use |
| TECHNICAL | 0.180 / 0.100 / 0.060 | Code, audits, engineering |
| CREATIVE | 0.280 / 0.160 / 0.100 | Writing, brainstorming |
| RESEARCH | 0.220 / 0.130 / 0.085 | Academic, long-form analysis |
| MEDICAL | 0.150 / 0.090 / 0.055 | High-stakes, precision-critical |
| **CIRCUIT** | **0.140 / 0.080 / 0.050** | **Logic verification, tightest tolerance** |
| CUSTOM | user-defined | Fully configurable |

---

## Validation Status

**Confirmed:** SDE math · Kalman filter · GARCH(1,1) · TF-IDF+JSD scoring · pipe injection · behavioral signal detection · per-preset GARCH tuning · epsilon parameterization · post-audit dual Kalman · Langevin/Neel-Brown math · EDM parallel discovery (Science Advances April 2026 independently arrived at same 45° angular gate ARCHITECT uses for drift detection) · Claude artifact deployment path · Vercel deployment path

**Requires validation:** C-score vs human judgment · H-signal false positive rate · 623.81 Hz physical anchor · Langevin/MTJ empirical co-validation against actual spintronic hardware · cross-domain applicability claims

---

## Advanced / Experimental (opt-in, consent required)

All behind **TUNE → ⚗ ADVANCED**. Clearly labeled experimental.

- Alt SDE Models (CIR, Heston stochastic volatility)
- Custom behavioral rails
- Stability convergence panel (RESONANCE_ANCHOR = 623.81 Hz)
- Edit constants (κ, ε, GARCH params)
- MHT Study (Metatron-Hudson Theory SDE)
- Poole Manifold CA Simulator (3D cellular automaton, full adder verification)
- Integrity Floor (DRIFT vs INTEGRITY BREACH detection)

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

## Project Structure

```
ARCHITECT.jsx              ← paste into Claude
components/ARCHITECT.jsx   ← same file, used by Next.js
pages/api/proxy.ts         ← multi-provider proxy (Anthropic · OpenAI · Grok)
pages/index.tsx            ← Next.js entry
public/embedder.worker.js  ← neural embedding Web Worker (Vercel only)
sdk/*.ts                   ← TypeScript math library
.claude/evals/ARCHITECT_EVALS.md  ← 15-check release checklist
ai/knowledge/
  DIALOGUE_BASELINES.md        ← output baseline reference for all models
  HALLUCINATION_REFERENCE.md   ← H-signal proxy guide
  ARCHITECT_CODING_RULES.md    ← coding invariants for any model working on this repo
  DOCUMENT_INTELLIGENCE.md     ← document parsing pipeline (dots.mocr integration)
```

---

## Citation

```
Perry, D. & Hudson, D. (2026). ARCHITECT: Volatility-Sensitive Correction Engine.
Hudson & Perry Research. @RaccoonStampede · @Prosperous727
github.com/Myth727/ARCHITECT-Universal-Coherence-Engine
```

---

*© 2026 Hudson & Perry Research — Experimental R&D. All outputs are proxy indicators.*
