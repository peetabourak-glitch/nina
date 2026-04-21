exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { email, data } = JSON.parse(event.body || "{}");

    if (!email || !data) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing email or data" }) };
    }

    const key = `nina:user:${email.toLowerCase().trim()}`;
    const value = JSON.stringify(data);

    // Upstash REST API — POST s JSON body
    const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([value]),
    });

    const json = await res.json();
    if (json.error) throw new Error(json.error);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
