# Document Intelligence Reference

**Universal knowledge seed for all AI models**
© 2026 Hudson & Perry Research · @RaccoonStampede · @Prosperous727

Source: dots.ocr / dots.mocr (RedNote HiLab, 2026) — state-of-the-art document parsing VLM.
Reference: arxiv.org/abs/2603.13032 · github.com/rednote-hilab/dots.ocr
Model: HuggingFace rednote-hilab/dots.mocr (3B parameters, SOTA on olmOCR-bench and OmniDocBench)

This document encodes everything an AI needs to intelligently process documents, images,
PDFs, tables, formulas, web pages, and scene text — either by calling dots.mocr directly
or by applying these principles when working with any vision-capable model.

---

## What This Covers

1. Eight document parsing task modes and their exact prompts
2. Complete document layout taxonomy (11 categories) with output format rules
3. Optimal inference parameters derived from production use
4. Image sizing constraints and the smart resize algorithm
5. Output cleaning rules — how VLMs fail on documents and how to recover
6. Format transformation rules (LaTeX, HTML, Markdown, base64)
7. Connection to ARCHITECT pinned document slots
8. Integration patterns for any vision-capable model

---

## Part 1 — Eight Parsing Task Modes

Each mode is a distinct task. Use the exact prompt string. The model switches behavior
by prompt alone — no architectural changes needed between tasks.

---

### Mode 1: Full Document Layout (`prompt_layout_all_en`)

**Use when:** Parsing any PDF, scanned document, or document image where you need the
complete structure — layout detection AND text extraction together.

**Exact prompt:**
```
Please output the layout information from the PDF image, including each layout element's
bbox, its category, and the corresponding text content within the bbox.

1. Bbox format: [x1, y1, x2, y2]

2. Layout Categories: The possible categories are ['Caption', 'Footnote', 'Formula',
'List-item', 'Page-footer', 'Page-header', 'Picture', 'Section-header', 'Table',
'Text', 'Title'].

3. Text Extraction & Formatting Rules:
    - Picture: For the 'Picture' category, the text field should be omitted.
    - Formula: Format its text as LaTeX.
    - Table: Format its text as HTML.
    - All Others (Text, Title, etc.): Format their text as Markdown.

4. Constraints:
    - The output text must be the original text from the image, with no translation.
    - All layout elements must be sorted according to human reading order.

5. Final Output: The entire output must be a single JSON object.
```

**Output format:** JSON array of layout objects.
**Example element:**
```json
{"bbox": [42, 88, 760, 112], "category": "Title", "text": "Document Title"}
{"bbox": [42, 130, 760, 480], "category": "Table", "text": "<table><tr><td>...</td></tr></table>"}
{"bbox": [42, 500, 380, 540], "category": "Formula", "text": "$$E = mc^2$$"}
```

---

### Mode 2: Layout Detection Only (`prompt_layout_only_en`)

**Use when:** You only need bounding boxes and category labels — no text extraction.
Faster, lower token usage.

**Exact prompt:**
```
Please output the layout information from this PDF image, including each layout's bbox
and its category. The bbox should be in the format [x1, y1, x2, y2]. The layout
categories for the PDF document include ['Caption', 'Footnote', 'Formula', 'List-item',
'Page-footer', 'Page-header', 'Picture', 'Section-header', 'Table', 'Text', 'Title'].
Do not output the corresponding text. The layout result should be in JSON format.
```

**Output format:** JSON array without `text` field.

---

### Mode 3: Pure OCR (`prompt_ocr`)

**Use when:** You just need the text content — no bounding boxes, no structure.
Equivalent to simple text extraction. Excludes Page-header and Page-footer.

**Exact prompt:**
```
Extract the text content from this image.
```

**Output format:** Plain text string.

---

### Mode 4: Grounding OCR (`prompt_grounding_ocr`)

**Use when:** You have a specific region of the document (a bounding box) and want
to extract only the text within that region.

**Exact prompt (append bbox coordinates):**
```
Extract text from the given bounding box on the image (format: [x1, y1, x2, y2]).
Bounding Box:
[x1, y1, x2, y2]
```

**Note:** Bbox coordinates must be scaled to match the model's resized input dimensions,
not the original image dimensions. See Part 5 for the resize algorithm.

---

### Mode 5: Web Page Parsing (`prompt_web_parsing`)

**Use when:** Input is a screenshot of a web page. Extracts layout structure in JSON.

**Exact prompt:**
```
Parsing the layout info of this webpage image with format json:
```

**Output format:** JSON with webpage layout elements.

---

### Mode 6: Scene Text Spotting (`prompt_scene_spotting`)

**Use when:** Input is a natural scene image (street signs, product labels, photos
with embedded text). Detects and recognizes all visible text.

**Exact prompt:**
```
Detect and recognize the text in the image.
```

**Output format:** Text string with detected text regions.

---

### Mode 7: Image to SVG (`prompt_image_to_svg`)

**Use when:** Converting charts, diagrams, logos, or structured graphics to SVG code.
The model produces renderable SVG that reconstructs the visual.

**Exact prompt (substitute actual dimensions):**
```
Please generate the SVG code based on the image.viewBox="0 0 {width} {height}"
```

**Output format:** SVG code string.
**Best model for this:** `dots.mocr-svg` (specialized variant, higher SVG accuracy).

---

### Mode 8: General QA (`prompt_general`)

**Use when:** Open-ended visual question answering on document content. No structured
output — model responds conversationally.

**Exact prompt:** Empty string (pass your question as the user message).

---

## Part 2 — Document Layout Taxonomy

11 categories. Every layout element in any document belongs to one of these.

| Category | Description | Output Format | Color (for visualization) |
|---|---|---|---|
| `Title` | Document or section main title | Markdown | Red |
| `Section-header` | Subsection headings | Markdown | Cyan |
| `Text` | Body text paragraphs | Markdown | Green |
| `List-item` | Bulleted or numbered list items | Markdown | Blue |
| `Caption` | Figure or table captions | Markdown | Orange |
| `Footnote` | Page footnotes | Markdown | Green |
| `Formula` | Mathematical expressions | **LaTeX** | Gray |
| `Table` | Tabular data | **HTML** | Pink |
| `Picture` | Images, figures, charts | **base64 crop** (text omitted) | Magenta |
| `Page-header` | Running header at top of page | Markdown | Green |
| `Page-footer` | Running footer at bottom of page | Markdown | Purple |

**Critical rules:**
- `Formula` → always LaTeX. Remove `\documentclass`, `\usepackage`, `\begin{document}` preamble. Wrap in `$$\n...\n$$`.
- `Table` → always HTML. Full `<table>` structure with `<tr>`, `<td>`, `<th>`.
- `Picture` → omit the `text` field entirely. Crop the image region and encode as base64 if needed.
- All elements must appear in **human reading order** (top-to-bottom, left-to-right, respecting column layout).

---

## Part 3 — Optimal Inference Parameters

These values are derived from production use and produce the best document parsing results.

| Parameter | Value | Why |
|---|---|---|
| `temperature` | `0.1` | Document parsing requires determinism. Low temperature prevents hallucination of text. |
| `top_p` | `0.9` (vLLM) / `1.0` (HF) | Standard nucleus sampling. |
| `max_completion_tokens` | `32768` (vLLM) / `24000` (HF) | Long documents produce long JSON. Never truncate mid-object. |
| `dpi` | `200` | Optimal balance of quality and processing speed for PDFs. 72 DPI if image > 4500px in any dimension. |
| `num_threads` | `64` | For multi-page PDFs. Each page processed in parallel. |

**For ARCHITECT's use case (single-document pinning):**
- Use `temperature=0.1` — you want exact text, not creative paraphrase
- Use `max_completion_tokens=16384` minimum — a single dense page can produce 8K+ tokens of JSON
- PDF at 200 DPI before sending to model

---

## Part 4 — Image Constraints and Smart Resize Algorithm

The model has hard pixel constraints. Images outside these bounds produce degraded results.

```
MIN_PIXELS = 3136    (56 × 56 minimum)
MAX_PIXELS = 11,289,600    (≈ 3360 × 3360 maximum)
IMAGE_FACTOR = 28    (all dimensions must be divisible by 28)
MAX_ASPECT_RATIO = 200    (max(h,w) / min(h,w) must be < 200)
```

**Smart resize algorithm** (must be applied before sending images):

1. Round height and width to nearest multiple of 28
2. If total pixels > MAX_PIXELS: scale down proportionally, maintaining 28-factor alignment
3. If total pixels < MIN_PIXELS: scale up proportionally, maintaining 28-factor alignment
4. Never distort aspect ratio beyond the rounding adjustments

**Why this matters for ARCHITECT pinned slots:**
When preprocessing a document image for the pinned slot system, apply smart resize
before sending to any vision model. Oversized images get silently truncated by most
APIs. Undersized images produce poor OCR accuracy.

**Practical sizing for common document types:**
- A4 at 200 DPI: 1654 × 2339 = 3.9M pixels — within bounds
- Letter at 300 DPI: 2550 × 3300 = 8.4M pixels — within bounds  
- Large poster at 600 DPI: may exceed MAX_PIXELS — must downscale first

---

## Part 5 — Output Cleaning Rules

VLMs produce imperfect JSON when parsing documents. These are the documented failure modes
and recovery strategies, derived from the `OutputCleaner` class in dots.ocr.

### Failure Mode 1: Incomplete JSON (most common)

**Symptom:** JSON array cut off mid-object — model hit token limit.

**Detection:** Output doesn't end with `]`. Or length > 50,000 characters.

**Recovery:**
1. Find the last `{"bbox":` occurrence
2. Truncate everything from that position back
3. Remove trailing comma if present
4. Close the array with `]`

**Rule:** Never try to complete the truncated object — you'll hallucinate coordinates.
Discard the incomplete last element. The preceding elements are reliable.

---

### Failure Mode 2: Missing Delimiters

**Symptom:** Two JSON objects appear adjacent with no comma: `}{`

**Detection:** Regex `\}\s*\{(?!")` matches this pattern.

**Recovery:** Replace `}{` with `},{` throughout.

---

### Failure Mode 3: Invalid Bbox (3 coordinates instead of 4)

**Symptom:** `"bbox": [x1, y1, x2]` — missing fourth coordinate.

**Recovery:** Keep `category` and `text` fields from that element, discard the `bbox`.
The text content is still valid even if the position is lost.

---

### Failure Mode 4: Duplicate Objects

**Symptom:** Same `{"bbox": ..., "category": ..., "text": ...}` object appears 5+ times.

**Cause:** Model looping on repeated content (headers, footers, watermarks).

**Recovery:** Keep first occurrence only. Remove all subsequent duplicates. Preserve reading order.

**Also check:** Duplicate bboxes with different text — indicates model re-detecting the same region.
Keep first occurrence.

---

### Failure Mode 5: JSON Parse Failure After Cleaning

**Fallback 1:** Use regex `\{[^{}]*?"bbox"\s*:\s*\[[^\]]*?\][^{}]*?\}` to extract
individual valid objects. Collect them into an array.

**Fallback 2:** If only one incomplete object, extract bbox coordinates, category,
and up to 10,000 characters of text individually using targeted regex.

---

### Validation Checklist Before Using Output

```
[ ] Is output a valid JSON array? → json.loads() without exception
[ ] Every object has "bbox" as [x1, y1, x2, y2] (4 numbers)? → x2 > x1, y2 > y1
[ ] Every object has "category" from the 11-item taxonomy?
[ ] Objects are in reading order (generally y1 increases down the page)?
[ ] No duplicate bboxes?
[ ] Tables formatted as HTML (starts with <table>)?
[ ] Formulas formatted as LaTeX (contains \\ or $)?
[ ] Picture objects have no "text" field?
```

---

## Part 6 — Format Transformation Rules

### LaTeX Formula Cleaning

Before storing or injecting formula text:

1. Remove preamble commands: `\documentclass{...}`, `\usepackage{...}`, `\begin{document}`, `\end{document}`
2. If already wrapped in `$$...$$` with no nested `$`: normalize to `$$\n{content}\n$$`
3. If wrapped in `\[...\]`: convert to `$$\n{content}\n$$`
4. If inline `$...$`: leave as-is
5. Remove backtick wrappers (`` `$...` `` → `$...$`)

### Table HTML

Tables come out as full HTML. When injecting into markdown or plain text:
- Strip `<table>`, use as-is for HTML contexts
- For plain text injection, convert `<td>` content to pipe-separated format: `| col1 | col2 |`
- Preserve `colspan` and `rowspan` information — important for complex financial and scientific tables

### Converting Layout JSON to Clean Markdown

Reading order is already correct. Concatenate text fields with double newlines:

```python
def layout_to_markdown(cells, skip_headers_footers=False):
    parts = []
    for cell in cells:
        if skip_headers_footers and cell['category'] in ['Page-header', 'Page-footer']:
            continue
        if cell['category'] == 'Picture':
            parts.append('![image](embedded)')  # or base64 if available
        elif cell['category'] == 'Formula':
            parts.append(clean_formula(cell['text']))
        else:
            parts.append(cell.get('text', '').strip())
    return '\n\n'.join(filter(None, parts))
```

For benchmark compatibility (OmniDocBench, olmOCR-bench), always skip Page-header
and Page-footer — these inflate edit distance scores artificially.

---

## Part 7 — Connection to ARCHITECT Pinned Document Slots

ARCHITECT's pinned document slots currently accept text files only (`readAsText()`).
They fail silently on PDFs and images. dots.mocr is the preprocessing layer that
unlocks these file types.

### File Type Detection Rules

| Extension | Direct text read | Needs VLM preprocessing |
|---|---|---|
| `.txt`, `.md`, `.csv`, `.json`, `.xml` | ✓ | — |
| `.py`, `.js`, `.ts`, `.html`, `.css` | ✓ | — |
| `.pdf` | ✗ | dots.mocr `prompt_layout_all_en` per page |
| `.jpg`, `.jpeg`, `.png` | ✗ | dots.mocr `prompt_layout_all_en` or `prompt_ocr` |
| `.docx`, `.xlsx`, `.pptx` | ✗ | Convert to PDF first, then dots.mocr |

### Preprocessing Pipeline for Binary Files

```
1. Detect file type by extension
2. If PDF: load at 200 DPI per page (fitz), send each page to dots.mocr
3. If image: apply smart_resize, send to dots.mocr
4. Collect JSON output per page
5. Run OutputCleaner on each page result
6. Convert each page to markdown via layout_to_markdown(skip_headers_footers=True)
7. Concatenate pages with page break markers
8. Truncate to 40KB (ARCHITECT's MAX_PINNED_CHARS)
9. Pin resulting text — AI now has full document context every turn
```

### Recommended Prompt Mode Per Document Type

| Document Type | Recommended Mode |
|---|---|
| Academic paper, report, contract | `prompt_layout_all_en` |
| Scanned document | `prompt_layout_all_en` |
| Screenshot, webpage | `prompt_web_parsing` |
| Scene photo with text | `prompt_scene_spotting` |
| Chart, diagram, logo | `prompt_image_to_svg` |
| Simple image with text | `prompt_ocr` |
| Known region of document | `prompt_grounding_ocr` |

---

## Part 8 — Integration with Any Vision-Capable Model

dots.mocr prompts work with any model that accepts image + text input. Behavior
varies by model capability.

### Using with GPT-4V / GPT-4o

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}},
            {"type": "text", "text": PROMPT_LAYOUT_ALL_EN}
        ]
    }],
    temperature=0.1,
    max_tokens=16384
)
```

**GPT-4V notes:** Generally respects JSON output format. Table HTML quality is high.
Formula LaTeX quality is moderate — may need preamble cleaning.

### Using with Claude

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16384,
    messages=[{
        "role": "user",
        "content": [
            {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": base64_image}},
            {"type": "text", "text": PROMPT_LAYOUT_ALL_EN}
        ]
    }]
)
```

**Claude notes:** Strong at reading order. Excellent table HTML. May add explanatory
text before JSON — strip everything before the first `[`.

### Using with Gemini

```python
response = model.generate_content([image_part, PROMPT_LAYOUT_ALL_EN])
```

**Gemini notes:** Strong OCR accuracy. May use different bbox normalization — verify
coordinates are in pixel space, not 0-1 normalized floats.

### Universal Post-Processing

Regardless of model, always:

1. Strip markdown code fences: remove `` ```json `` and `` ``` `` wrappers
2. Strip explanatory text: find first `[` and last `]`, extract that substring
3. Run OutputCleaner — every model produces malformed JSON occasionally
4. Validate bbox coordinates: `x2 > x1` and `y2 > y1` for all elements
5. Scale coordinates back to original image dimensions if model resized input

---

## Part 9 — Performance Benchmarks (For Model Selection)

When choosing between models for document parsing tasks:

| Benchmark | dots.mocr | Gemini 2.5 Pro | Qwen3-VL-235B | Notes |
|---|---|---|---|---|
| OmniDocBench TextEdit↓ | **0.031** | 0.075 | 0.069 | Lower is better |
| OmniDocBench ReadOrder↓ | **0.029** | 0.097 | 0.068 | Lower is better |
| olmOCR-bench Overall | 83.9% | — | — | Higher is better |
| Tables (TEDS)↑ | 90.7% | — | — | HTML table quality |
| Elo Score Average | 1124.7 | **1210.7** | — | Gemini leads on Elo |

**Practical guidance:**
- For structured document parsing (PDFs, contracts, academic papers): dots.mocr is most cost-effective at 3B parameters
- For maximum accuracy on complex mixed documents: Gemini 2.5 Pro leads on Elo
- For SVG generation from charts/diagrams: `dots.mocr-svg` is specialized and leads all models
- For multilingual documents (Arabic, Tibetan, Kannada, Cyrillic, CJK): dots.mocr has explicit optimization

---

## Quick Reference Card

```
TASK                    PROMPT MODE               OUTPUT FORMAT
─────────────────────────────────────────────────────────────
Full layout + text      prompt_layout_all_en      JSON array
Layout boxes only       prompt_layout_only_en     JSON array (no text)
Plain text extract      prompt_ocr                String
Region extraction       prompt_grounding_ocr      String
Web page                prompt_web_parsing        JSON
Scene/photo text        prompt_scene_spotting     String
Chart → SVG             prompt_image_to_svg       SVG code
General QA              prompt_general            String

INFERENCE PARAMS        VALUE
─────────────────────
temperature             0.1
top_p                   0.9
max_tokens              16384–32768
dpi (PDF raster)        200

IMAGE CONSTRAINTS       VALUE
─────────────────────
min_pixels              3,136 (56×56)
max_pixels              11,289,600 (~3360×3360)
dimension_factor        28 (all dims divisible by 28)
max_aspect_ratio        200:1

LAYOUT CATEGORIES (11)
─────────────────────
Title, Section-header, Text, List-item, Caption, Footnote,
Formula (→LaTeX), Table (→HTML), Picture (→omit text),
Page-header, Page-footer

COMMON FAILURE MODES    RECOVERY
─────────────────────────────────────────────────────────────
Truncated JSON          Find last {"bbox": and cut before it
Missing commas          Replace }{ with },{
3-coord bbox            Keep text/category, drop bbox
5+ duplicate objects    Keep first, discard rest
Parse failure           Regex-extract individual objects
```

---

## Attribution and License

dots.ocr / dots.mocr is developed by RedNote HiLab (Xiaohongshu).
This knowledge seed is derived from the open-source repository and papers.
Cite as:

```
Zheng et al. (2026). Multimodal OCR: Parse Anything from Documents. arXiv:2603.13032
Li et al. (2025). dots.ocr: Multilingual Document Layout Parsing. arXiv:2512.02498
```

Model weights: huggingface.co/rednote-hilab/dots.mocr
License: dots.ocr LICENSE AGREEMENT (see repository)

---

*© 2026 Hudson & Perry Research — This knowledge seed compiled for ARCHITECT integration.*
*All prompt text © RedNote HiLab. Inference parameters and algorithms derived from open-source code.*
