exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { email } = JSON.parse(event.body || "{}");

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing email" }) };
    }

    const key = `nina:user:${email.toLowerCase().trim()}`;

    const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/${encodeURIComponent(key)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    });

    const json = await res.json();

    if (!json.result) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: null }),
      };
    }

    let data;
    try {
      const parsed = JSON.parse(json.result);
      // Zprávy jsou soukromé — nepřenášíme je mezi zařízeními
      // Přenášíme jen postup: chemie, paměť, tokeny, nálada
      data = {
        chemistry: parsed.chemistry,
        memory: parsed.memory,
        tokens: parsed.tokens,
        mood: parsed.mood,
        userMessageCount: parsed.userMessageCount,
        updatedAt: parsed.updatedAt,
      };
    } catch(e) {
      data = null;
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
