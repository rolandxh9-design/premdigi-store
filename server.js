// Serves the static storefront and provides two small API endpoints so
// completed PayPal orders can be recorded and reviewed in admin.html.
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set in .env (see .env.example) — falls back to a default for first run only.
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";

// DATA_DIR lets a host mount a persistent volume somewhere other than the
// app's own folder (which is usually rebuilt/wiped on every deploy) — e.g.
// set DATA_DIR=/data on Northflank and mount the volume at /data.
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8"));
  } catch (e) {
    return [];
  }
}

function writeOrders(orders) {
  fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true });
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function requireAdminAuth(req, res, next) {
  const expected = "Basic " + Buffer.from(`${ADMIN_USER}:${ADMIN_PASSWORD}`).toString("base64");
  if (req.headers.authorization === expected) return next();
  res.set("WWW-Authenticate", 'Basic realm="PremDigi Admin"');
  res.status(401).send("Authentication required.");
}

// Allows the storefront to be hosted on a different domain (e.g. Netlify)
// from this API server (e.g. Render/Railway). The public order-logging
// endpoint is harmless to open widely; the orders GET stays behind its
// own password check regardless of origin.
app.use(cors());
app.use(express.json());

// admin.html itself is a plain static page (just a login form + empty
// table shell) — the real protection is here, on the data endpoint.
app.get("/api/orders", requireAdminAuth, (req, res) => {
  res.json(readOrders());
});

// Public: called right after a PayPal capture succeeds, to log the order.
// NOTE: this trusts client-reported data. Anyone who can reach this endpoint
// can POST a fabricated order. For real production use, verify the order
// server-side against PayPal's Orders API (using your client secret) before
// trusting it — this simple version is meant for getting started quickly.
app.post("/api/orders", (req, res) => {
  const { paypalOrderId, payerName, payerEmail, items, total, currency } = req.body || {};

  if (!paypalOrderId || !Array.isArray(items) || items.length === 0 || typeof total !== "number") {
    return res.status(400).json({ error: "Invalid order payload." });
  }

  const order = {
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

  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);
  res.status(201).json({ ok: true });
});

// Only the public/ folder is ever served over HTTP — server.js, package.json,
// .env, and data/orders.json (customer names/emails) stay off-limits.
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`PremDigi Store running at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin.html (user: ${ADMIN_USER})`);
  if (ADMIN_PASSWORD === "changeme") {
    console.log("WARNING: using the default admin password — set ADMIN_USER / ADMIN_PASSWORD env vars before deploying.");
  }
});
