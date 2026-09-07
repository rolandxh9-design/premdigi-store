// Local development server only — the deployed site runs entirely on
// Netlify (static files + the function in netlify/functions/orders.mjs).
// This lets you run `npm start` and test the whole site, including the
// order API, without needing the Netlify CLI.
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { buildOrder, isValidAdminAuth, ADMIN_USER, ADMIN_PASSWORD } = require("./lib/order-utils");
const { getAllOrders, saveOrder } = require("./lib/orders-file-store");

const app = express();
const PORT = process.env.PORT || 3000;

function requireAdminAuth(req, res, next) {
  if (isValidAdminAuth(req.headers.authorization)) return next();
  res.set("WWW-Authenticate", 'Basic realm="PremDigi Admin"');
  res.status(401).send("Authentication required.");
}

app.use(cors());
app.use(express.json());

app.get("/api/orders", requireAdminAuth, async (req, res) => {
  res.json(await getAllOrders());
});

app.post("/api/orders", async (req, res) => {
  const order = buildOrder(req.body);
  if (!order) {
    return res.status(400).json({ error: "Invalid order payload." });
  }
  await saveOrder(order);
  res.status(201).json({ ok: true });
});

// Only the public/ folder is ever served over HTTP — server.js, package.json,
// .env, and data/orders.json (customer names/emails) stay off-limits.
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`PremDigi Store (local dev) running at http://localhost:${PORT}`);
  console.log(`Admin panel at http://localhost:${PORT}/admin.html (user: ${ADMIN_USER})`);
  console.log("Using local file storage for orders (Netlify Blobs is used automatically once deployed).");
  if (ADMIN_PASSWORD === "changeme") {
    console.log("WARNING: using the default admin password — set ADMIN_USER / ADMIN_PASSWORD env vars before deploying.");
  }
});
