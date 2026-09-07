// Local JSON file storage — used only by the local dev server (server.js).
// The deployed site uses Netlify Blobs instead (see netlify/functions/orders.mjs).
const fs = require("fs");
const path = require("path");

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

async function getAllOrders() {
  return readOrdersFile();
}

async function saveOrder(order) {
  const orders = readOrdersFile();
  orders.unshift(order);
  writeOrdersFile(orders);
}

module.exports = { getAllOrders, saveOrder };
