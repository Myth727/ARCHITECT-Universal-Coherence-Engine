// pages/api/proxy.ts  —  V2.1
// Multi-provider serverless proxy.
// User key passed in x-api-key header. Never stored server-side.
// V2.1: forwards AutoTune params (temperature, top_p, frequency_penalty) when present.

import type { NextApiRequest, NextApiResponse } from 'next';

const PROVIDERS: Record<string, { endpoint: string; format: 'anthropic' | 'openai' }> = {
  anthropic: { endpoint: 'https://api.anthropic.com/v1/messages',        format: 'anthropic' },
  openai:    { endpoint: 'https://api.openai.com/v1/chat/completions',    format: 'openai'    },
  grok:      { endpoint: 'https://api.x.ai/v1/chat/completions',          format: 'openai'    },
};

const DEFAULT_MODELS: Record<string, string> = {
  anthropic: 'claude-sonnet-4-6',
  openai:    'gpt-4o',
  grok:      'grok-3',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey   = req.headers['x-api-key'] as string;
  const provider = (req.headers['x-architect-provider'] as string) || 'anthropic';

  if (!apiKey) {
    return res.status(401).json({
      error: 'No API key provided. Enter your key in the ARCHITECT key field.',
    });
  }

  const providerConfig = PROVIDERS[provider];
  if (!providerConfig) return res.status(400).json({ error: `Unknown provider: ${provider}` });

  try {
    // ── V2.1: Extract AutoTune params if present ──────────────────
    const {
      messages, system, max_tokens, model,
      temperature, top_p, frequency_penalty,   // AutoTune params — optional
    } = req.body;

    // Clamp AutoTune params to safe ranges before forwarding
    const safeTemp  = temperature  != null ? Math.min(Math.max(Number(temperature),  0.0), 2.0) : undefined;
    const safeTopP  = top_p        != null ? Math.min(Math.max(Number(top_p),        0.0), 1.0) : undefined;
    const safeFreq  = frequency_penalty != null
      ? Math.min(Math.max(Number(frequency_penalty), -2.0), 2.0) : undefined;

    let requestBody: any;
    let requestHeaders: Record<string, string> = { 'Content-Type': 'application/json' };

    if (providerConfig.format === 'anthropic') {
      requestHeaders['x-api-key']          = apiKey;
      requestHeaders['anthropic-version']  = '2023-06-01';
      requestBody = {
        ...req.body,
        ...(safeTemp  != null ? { temperature:         safeTemp  } : {}),
        ...(safeTopP  != null ? { top_p:               safeTopP  } : {}),
      };
    } else {
      // OpenAI-compatible (OpenAI, Grok)
      requestHeaders['Authorization'] = `Bearer ${apiKey}`;
      const oaiMessages = system
        ? [{ role: 'system', content: system }, ...messages]
        : messages;
      requestBody = {
        model: model || DEFAULT_MODELS[provider],
        max_tokens: max_tokens || 1000,
        messages: oaiMessages,
        ...(safeTemp  != null ? { temperature:         safeTemp  } : {}),
        ...(safeTopP  != null ? { top_p:               safeTopP  } : {}),
        ...(safeFreq  != null ? { frequency_penalty:   safeFreq  } : {}),
      };
    }

    const response = await fetch(providerConfig.endpoint, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) return res.status(response.status).json(data);

    // Normalize OpenAI response to Anthropic format
    if (providerConfig.format === 'openai') {
      return res.status(200).json({
        content: [{ type: 'text', text: data.choices?.[0]?.message?.content || '' }],
        stop_reason: data.choices?.[0]?.finish_reason || 'end_turn',
        model: data.model,
      });
    }

    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: 'Proxy error', detail: err.message });
  }
}
