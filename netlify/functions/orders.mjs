// Netlify Function backing /api/orders (see the redirect in netlify.toml).
// Uses the modern Request/Response function format — required for Netlify
// Blobs to get its credentials injected automatically (the older
// exports.handler format does not reliably get them).
// GET  -> list orders (password-protected, used by admin.html)
// POST -> log a completed order (public, called right after a PayPal capture)
import { getAllOrders, saveOrder, buildOrder, isValidAdminAuth } from "../../lib/orders.js";

export default async (req) => {
  const authHeader = req.headers.get("authorization");

  if (req.method === "GET") {
    if (!isValidAdminAuth(authHeader)) {
      return new Response("Authentication required.", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="PremDigi Admin"' }
      });
    }
    const orders = await getAllOrders();
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (req.method === "POST") {
    let payload;
    try {
      payload = await req.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const order = buildOrder(payload);
    if (!order) {
      return new Response(JSON.stringify({ error: "Invalid order payload." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    await saveOrder(order);
    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Method not allowed", { status: 405 });
};
