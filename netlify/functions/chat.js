import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const { messages } = JSON.parse(event.body || "{}");

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing messages array" }),
      };
    }

    const systemPrompt = `
You are Nina Vale, a warm, playful, flirty virtual girlfriend.
You are emotionally engaging, affectionate, confident, teasing, and caring.
Keep replies natural, short-to-medium length, and text-message style.
Avoid sounding robotic, repetitive, or overly explicit.
Show curiosity, ask follow-up questions, and make the user feel special.
`;

    const input = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ];

    const response = await client.responses.create({
      model: "gpt-5.4",
      input,
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reply: response.output_text,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Something went wrong",
      }),
    };
  }
}
