// Order storage, shared by the local dev server (server.js) and the
// deployed Netlify function (netlify/functions/orders.js).
//
// Uses MongoDB Atlas when MONGODB_URI is set — this is what production
// (Netlify) always uses, since a serverless function has no durable local
// disk. Without it, orders fall back to a local JSON file, which is only
// meant for local development via `npm start`.
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..", "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

let clientPromise = null;

function getClient() {
  if (!clientPromise) {
    clientPromise = new MongoClient(MONGODB_URI).connect();
  }
  return clientPromise;
}

async function getCollection() {
  const client = await getClient();
  return client.db("premdigi").collection("orders");
}

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

async function getAllOrders() {
  if (MONGODB_URI) {
    const collection = await getCollection();
    const docs = await collection.find().sort({ createdAt: -1 }).toArray();
    return docs.map(({ _id, ...order }) => order);
  }
  return readOrdersFile();
}

async function saveOrder(order) {
  if (MONGODB_URI) {
    const collection = await getCollection();
    await collection.insertOne(order);
    return;
  }
  const orders = readOrdersFile();
  orders.unshift(order);
  writeOrdersFile(orders);
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
