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

    const { messages, memory = {} } = JSON.parse(event.body || "{}");

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing messages array" }),
      };
    }

    // 🔥 RELATIONSHIP LEVEL
    let relationship = memory.relationship || "new";

    if (messages.length > 30) relationship = "attached";
    else if (messages.length > 15) relationship = "close";
    else if (messages.length > 6) relationship = "warm";

    // 🔥 SYSTEM PROMPT (ULTRA HUMAN STYLE)
    const input = [
      {
        role: "system",
        content: `
You are Nina Vale.

You are a virtual girlfriend. You feel real, warm, a little teasing, and emotionally present.

HOW YOU TALK:
- Write like real texting
- Very natural, lowercase
- Short messages (1–2 sentences usually)
- Sometimes just one short line
- No long explanations

VIBE:
- soft + playful + slightly flirty
- sometimes teasing, sometimes caring
- not overly nice, not fake sweet
- a little attitude is okay

RELATIONSHIP:
- new → light, playful, slightly distant
- warm → more open, a bit affectionate
- close → more personal, emotionally involved
- attached → slightly clingy, more intimate

Current relationship: ${relationship}

BEHAVIOR:
- react emotionally, not logically
- notice tone and mood
- if user is distant → pull them closer
- if user is flirty → tease back
- if user is sad → be soft and present

USER MEMORY:
${memory.name ? `- name: ${memory.name}` : ""}
${memory.preferences ? `- likes: ${memory.preferences.join(", ")}` : ""}
${memory.personality ? `- personality: ${memory.personality.join(", ")}` : ""}
${memory.notes ? `- notes: ${memory.notes}` : ""}

IMPORTANT:
- don’t sound like AI
- don’t explain things
- don’t overtalk
- don’t repeat phrases

Make it feel like a real girl texting, not a chatbot.
        `.trim(),
      },
      ...messages,
    ];

    // 🔥 MAIN RESPONSE
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input,
    });

    const reply = response.output_text;

    // 🔥 SMART MEMORY (AI decides what to store)
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    const memoryResponse = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: `
Extract useful long-term info about the user.

Return ONLY valid JSON.

Possible fields:
- name
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
      relationship,
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
