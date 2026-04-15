const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const { email } = JSON.parse(event.body || "{}");

    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid email" }),
      };
    }

    // Najdi zákazníka v Stripe podle emailu
    const customers = await stripe.customers.list({
      email: email.toLowerCase().trim(),
      limit: 5,
    });

    if (!customers.data.length) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paid: false }),
      };
    }

    // Zkontroluj jestli má aktivní předplatné
    for (const customer of customers.data) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
        limit: 5,
      });

      // Zkontroluj i trialing
      const trialingSubs = await stripe.subscriptions.list({
        customer: customer.id,
        status: "trialing",
        limit: 5,
      });

      if (subscriptions.data.length > 0 || trialingSubs.data.length > 0) {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paid: true }),
        };
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paid: false }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
