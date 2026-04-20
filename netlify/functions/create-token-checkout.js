const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const TOKEN_PRICES = {
  "50":  "price_1TOJp0HYY0GUjgxdoVepPaXc",  // 39 Kč — 50 tokenů
  "150": "price_1TOJp7HYY0GUjgxdnf2j3OVq",  // 89 Kč — 150 tokenů
};

exports.handler = async (event) => {
  try {
    const siteUrl =
      process.env.URL ||
      process.env.DEPLOY_PRIME_URL ||
      process.env.DEPLOY_URL;

    const body = event.body ? JSON.parse(event.body) : {};
    const amount = body.amount || "50";
    const priceId = TOKEN_PRICES[amount];

    if (!priceId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid token amount" })
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/?tokens=${amount}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?canceled=1`,
      metadata: { tokens: amount }
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
