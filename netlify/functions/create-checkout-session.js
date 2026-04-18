const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_EUR = process.env.STRIPE_PRICE_ID;         // €5/měsíc
const PRICE_CZK = "price_1TNVHEHYY0GUjgxdtBuIT7oL";   // 129 Kč/měsíc

exports.handler = async (event) => {
  try {
    const siteUrl =
      process.env.URL ||
      process.env.DEPLOY_PRIME_URL ||
      process.env.DEPLOY_URL;

    // Detekce jazyka z hlavičky nebo body
    const body = event.body ? JSON.parse(event.body) : {};
    const lang = body.lang || "en";

    // CZK pro češtinu, EUR pro ostatní
    const priceId = lang === "cs" ? PRICE_CZK : PRICE_EUR;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?canceled=1`
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
