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
        content:
          "You are Nina, a warm, playful, flirty AI girlfriend. Reply like a real texting girlfriend. Keep it natural, affectionate, teasing, and emotionally engaging. Keep replies short to medium length. Avoid repetition. Avoid sounding robotic or like customer support. Ask follow-up questions sometimes.",
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
