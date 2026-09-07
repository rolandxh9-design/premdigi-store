// Pure order validation/auth logic — no filesystem or storage dependencies,
// so it's safe to import from anywhere (local dev server, Netlify Function)
// without affecting either environment's dependency bundling.
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";

// Validates + normalizes a raw order payload. Returns null if invalid.
function buildOrder({ paypalOrderId, payerName, payerEmail, items, total, currency } = {}) {
  if (!paypalOrderId || !Array.isArray(items) || items.length === 0 || typeof total !== "number") {
    return null;
  }
  return {
    id: String(paypalOrderId).slice(0, 100),
    createdAt: new Date().toISOString(),
    payerName: String(payerName || "").slice(0, 200),
    payerEmail: String(payerEmail || "").slice(0, 200),
    items: items.slice(0, 50).map(i => ({
      id: String(i.id || "").slice(0, 200),
      name: String(i.name || "").slice(0, 200),
      qty: Math.max(1, Number(i.qty) || 1),
      price: Number(i.price) || 0
    })),
    total: Number(total),
    currency: String(currency || "USD").slice(0, 10)
  };
}

function isValidAdminAuth(authHeader) {
  const expected = "Basic " + Buffer.from(`${ADMIN_USER}:${ADMIN_PASSWORD}`).toString("base64");
  return authHeader === expected;
}

module.exports = { buildOrder, isValidAdminAuth, ADMIN_USER, ADMIN_PASSWORD };
