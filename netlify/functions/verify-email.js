const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const DEVICE_LIMIT = 2;

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const { email, deviceId } = JSON.parse(event.body || "{}");

    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid email" }),
      };
    }

    if (!deviceId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing device ID" }),
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

    // Zkontroluj předplatné a zařízení
    for (const customer of customers.data) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
        limit: 5,
      });

      const trialingSubs = await stripe.subscriptions.list({
        customer: customer.id,
        status: "trialing",
        limit: 5,
      });

      const hasActiveSub = subscriptions.data.length > 0 || trialingSubs.data.length > 0;

      if (!hasActiveSub) continue;

      // Načti aktuální zařízení z Stripe metadata
      const meta = customer.metadata || {};
      const devicesRaw = meta.devices || "";
      const devices = devicesRaw ? devicesRaw.split(",").filter(Boolean) : [];

      // Pokud zařízení už je registrované — povolíme
      if (devices.includes(deviceId)) {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paid: true, customerId: customer.id }),
        };
      }

      // Pokud je limit překročen — zamítneme
      if (devices.length >= DEVICE_LIMIT) {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paid: false,
            deviceLimitReached: true,
          }),
        };
      }

      // Nové zařízení — přidáme ho do Stripe metadata
      const updatedDevices = [...devices, deviceId].join(",");
      await stripe.customers.update(customer.id, {
        metadata: { ...meta, devices: updatedDevices },
      });

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paid: true, customerId: customer.id }),
      };
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
