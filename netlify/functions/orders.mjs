// Netlify Function backing /api/orders (see the redirect in netlify.toml).
// Uses the modern Request/Response function format, and imports
// @netlify/blobs directly (rather than through a shared local module) so
// Netlify's function bundler reliably includes it in the deployed bundle.
// GET  -> list orders (password-protected, used by admin.html)
// POST -> log a completed order (public, called right after a PayPal capture)
import { getStore } from "@netlify/blobs";
import { buildOrder, isValidAdminAuth } from "../../lib/order-utils.js";

const BLOB_STORE_NAME = "premdigi-orders";

// Each order is its own blob, keyed by its PayPal order ID. This avoids a
// read-modify-write race on a single shared blob — two checkouts completing
// at nearly the same moment would otherwise silently overwrite each other
// (Netlify Blobs is last-write-wins with no built-in list concurrency).
async function getAllOrders() {
  const store = getStore(BLOB_STORE_NAME);
  const { blobs } = await store.list();
  const orders = await Promise.all(blobs.map(b => store.get(b.key, { type: "json" })));
  // Filters out the old pre-migration "orders" blob (a single array under one
  // key) and anything else malformed, alongside real per-order objects.
  return orders
    .filter(o => o && typeof o === "object" && !Array.isArray(o) && o.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function saveOrder(order) {
  const store = getStore(BLOB_STORE_NAME);
  await store.setJSON(order.id, order, { onlyIfNew: true });
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
