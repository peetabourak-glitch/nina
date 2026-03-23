const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { session_id } = JSON.parse(event.body);

    if (!session_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing session_id" })
      };
    }

    // vezmeme checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const customer = session.customer;

    if (!customer) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No customer found" })
      };
    }

    // vytvoříme portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer,
      return_url: process.env.URL
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: portalSession.url
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
};
