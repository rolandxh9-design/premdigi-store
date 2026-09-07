// Netlify Function backing /api/orders (see the redirect in netlify.toml).
// Uses the modern Request/Response function format, and imports
// @netlify/blobs directly (rather than through a shared local module) so
// Netlify's function bundler reliably includes it in the deployed bundle.
// GET  -> list orders (password-protected, used by admin.html)
// POST -> log a completed order (public, called right after a PayPal capture)
import { getStore } from "@netlify/blobs";
import { buildOrder, isValidAdminAuth } from "../../lib/order-utils.js";

const BLOB_STORE_NAME = "premdigi-orders";
const BLOB_KEY = "orders";

async function getAllOrders() {
  const store = getStore(BLOB_STORE_NAME);
  const data = await store.get(BLOB_KEY, { type: "json" });
  return data || [];
}

async function saveOrder(order) {
  const store = getStore(BLOB_STORE_NAME);
  const orders = (await store.get(BLOB_KEY, { type: "json" })) || [];
  orders.unshift(order);
  await store.setJSON(BLOB_KEY, orders);
}

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
