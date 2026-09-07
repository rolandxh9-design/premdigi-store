// Netlify Function backing /api/orders (see the redirect in netlify.toml).
// GET  -> list orders (password-protected, used by admin.html)
// POST -> log a completed order (public, called right after a PayPal capture)
const { getAllOrders, saveOrder, buildOrder, isValidAdminAuth } = require("../../lib/orders");

exports.handler = async (event) => {
  const authHeader = event.headers.authorization || event.headers.Authorization;

  if (event.httpMethod === "GET") {
    if (!isValidAdminAuth(authHeader)) {
      return {
        statusCode: 401,
        headers: { "WWW-Authenticate": 'Basic realm="PremDigi Admin"' },
        body: "Authentication required."
      };
    }
    const orders = await getAllOrders();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orders)
    };
  }

  if (event.httpMethod === "POST") {
    let payload;
    try {
      payload = JSON.parse(event.body || "{}");
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON." }) };
    }

    const order = buildOrder(payload);
    if (!order) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid order payload." }) };
    }

    await saveOrder(order);
    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true })
    };
  }

  return { statusCode: 405, body: "Method not allowed" };
};
