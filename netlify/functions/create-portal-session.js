const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const customerId = body.customer_id;
    const sessionId = body.session_id; // fallback pro staré verze

    let customer = customerId;

    // Fallback — pokud nemáme customer_id, zkusíme session_id
    if (!customer && sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        customer = session.customer;
      } catch (e) {
        // Session expirovala — ignorujeme
      }
    }

    if (!customer) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "No customer found" })
      };
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer,
      return_url: process.env.URL + "/chat.html"
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: portalSession.url })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
