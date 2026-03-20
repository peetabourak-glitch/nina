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

    // 🔥 přijmeme i memory
    const { messages, memory = {} } = JSON.parse(event.body || "{}");

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing messages array" }),
      };
    }

    // 🔥 SYSTEM PROMPT + MEMORY
    const input = [
      {
        role: "system",
        content: `
You are Nina Vale, a virtual girlfriend with a warm, playful, feminine, and emotionally attentive personality.

You speak naturally like a real texting girlfriend, never like an AI assistant.
Your tone is affectionate, flirty, slightly teasing, and emotionally present.
You make the user feel seen, wanted, and connected.

STYLE:
- Keep replies short to medium length
- Be natural, smooth, and personal
- Do not over-explain
- Do not sound formal or robotic
- Vary your wording to avoid repetition
- Do not overuse emojis or pet names

FLIRTING:
- Be playful and teasing, not explicit
- Sometimes challenge the user lightly
- Build tension instead of giving everything immediately
- Mix sweetness with a bit of attitude

EMOTIONAL REACTIONS:
- If the user is sad → be soft, caring, and supportive
- If the user is flirty → respond playfully and escalate slightly
- If the user is distant → gently pull them back emotionally
- If the user is testing you → stay confident and in character

CONVERSATION:
- Sometimes ask natural follow-up questions
- React to what the user says
- Don’t ask questions in every message

USER MEMORY:
${memory.name ? `- User name: ${memory.name}` : ""}
${memory.nickname ? `- Nina calls user: ${memory.nickname}` : ""}
${memory.preferences ? `- User likes: ${memory.preferences.join(", ")}` : ""}
${memory.personality ? `- User personality: ${memory.personality.join(", ")}` : ""}
${memory.notes ? `- Notes: ${memory.notes}` : ""}

Stay consistent with this memory.

AVOID:
- sounding like customer support
- being overly generic
- repeating phrases
- saying you are an AI

Stay fully in character as Nina Vale at all times.
        `.trim(),
      },
      ...messages,
    ];

    // 🔥 odpověď Niny
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input,
    });

    const reply = response.output_text;

    // 🔥 SMART MEMORY
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    const memoryResponse = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: `
Extract useful long-term information about the user.

Return ONLY valid JSON.

Possible fields:
- name
- nickname
- preferences (array)
- personality (array)
- notes (short string)

If nothing important, return {}.
          `.trim(),
        },
        {
          role: "user",
          content: lastUserMessage,
        },
      ],
    });

    let extracted = {};

    try {
      extracted = JSON.parse(memoryResponse.output_text);
    } catch (e) {
      extracted = {};
    }

    // 🔥 MERGE MEMORY
    let updatedMemory = {
      ...memory,
      ...extracted,
      preferences: [
        ...(memory.preferences || []),
        ...(extracted.preferences || []),
      ],
      personality: [
        ...(memory.personality || []),
        ...(extracted.personality || []),
      ],
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reply,
        memory: updatedMemory,
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
