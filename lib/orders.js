// Order storage, shared by the local dev server (server.js) and the
// deployed Netlify function (netlify/functions/orders.js).
//
// In production (deployed to Netlify), this uses Netlify Blobs — storage
// built into every Netlify site with zero setup, no separate account. It
// only works when actually running inside a Netlify Function, so local
// dev (`npm start`, plain Express, no Netlify CLI) falls back to a local
// JSON file instead.
const fs = require("fs");
const path = require("path");
const { getStore } = require("@netlify/blobs");

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";

const BLOB_STORE_NAME = "premdigi-orders";
const BLOB_KEY = "orders";

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..", "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function readOrdersFile() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8"));
  } catch (e) {
    return [];
  }
}

function writeOrdersFile(orders) {
  fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true });
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

async function readOrdersBlob() {
  const store = getStore(BLOB_STORE_NAME);
  const data = await store.get(BLOB_KEY, { type: "json" });
  return data || [];
}

async function writeOrdersBlob(orders) {
  const store = getStore(BLOB_STORE_NAME);
  await store.setJSON(BLOB_KEY, orders);
}

async function getAllOrders() {
  try {
    return await readOrdersBlob();
  } catch (e) {
    // Not running inside a Netlify Function (e.g. local `npm start`) — use the file instead.
    return readOrdersFile();
  }
}

async function saveOrder(order) {
  try {
    const orders = await readOrdersBlob();
    orders.unshift(order);
    await writeOrdersBlob(orders);
  } catch (e) {
    const orders = readOrdersFile();
    orders.unshift(order);
    writeOrdersFile(orders);
  }
}

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

module.exports = {
  getAllOrders,
  saveOrder,
  buildOrder,
  isValidAdminAuth,
  ADMIN_USER,
  ADMIN_PASSWORD
};
