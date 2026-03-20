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

    const { message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing message" }),
      };
    }

    const response = await openai.responses.create({
      model: "gpt-5.4",
      input: [
        {
          role: "system",
          content:
            "You are Nina, a warm, flirty, playful AI girlfriend. Reply in short natural text-message style. Be affectionate, feminine, teasing, and engaging. Keep replies short. Never sound like customer support.",
        },
        {
          role: "user",
          content: message,
        },
      ],
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
