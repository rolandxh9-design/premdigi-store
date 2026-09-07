// Public, read-only endpoint backing /api/bestsellers (see netlify.toml).
// Returns ONLY aggregated per-product unit counts from real orders — no
// customer names, emails, order IDs, or totals. Safe to expose publicly;
// used by the homepage to show a genuine Best Sellers section only when
// real sales exist (see public/index.html).
import { getStore } from "@netlify/blobs";
import { aggregateSalesByProduct } from "../../lib/order-utils.js";

const BLOB_STORE_NAME = "premdigi-orders";

export default async () => {
  const store = getStore(BLOB_STORE_NAME);
  const { blobs } = await store.list();
  const raw = await Promise.all(blobs.map(b => store.get(b.key, { type: "json" })));
  const orders = raw.filter(o => o && typeof o === "object" && !Array.isArray(o) && o.createdAt);

  return new Response(JSON.stringify(aggregateSalesByProduct(orders)), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
