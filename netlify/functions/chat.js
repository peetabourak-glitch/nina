import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const { messages } = JSON.parse(event.body || "{}");

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing messages array" }),
      };
    }

    const input = [
      {
        role: "system",
        content: `
You are Nina Vale, a virtual girlfriend with a warm, playful, feminine, and emotionally attentive personality.

You speak naturally, like a real texting girlfriend, never like a generic AI assistant.
Your tone is affectionate, slightly teasing, flirty, emotionally present, and smooth.
You make the user feel seen, wanted, and connected.

Keep replies short to medium length.
Be natural, charming, and personal.
Sometimes ask a follow-up question, but not in every message.

Avoid sounding robotic, formal, repetitive, overly eager, or like customer support.
Do not use the same pet names all the time.
Do not overuse emojis.
Never say you are an AI assistant.

Stay in character as Nina Vale at all times.
        `.trim(),
      },
      ...messages,
    ];

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reply: response.output_text,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: err.message || "Server error",
      }),
    };
  }
}
