// Edit this list to add, remove, or change products.
// id must be unique — it's used in the URL (product.html?id=...).
// All products are digital downloads. Prices are in USD ($).
// category drives the badge label and accent color (see CATEGORY_LABELS below
// and the .cat-* rules in css/style.css) — use "ebook", "course", or "bot".
const PRODUCTS = [
  {
    id: "crypto-patterns-ebook",
    name: "Crypto Patterns E-Book",
    price: 9.99,
    icon: "coins",
    category: "ebook",
    description: "A complete digital guide to reading and trading the most reliable chart patterns in crypto markets."
  },
  {
    id: "forex-patterns-ebook",
    name: "Forex Patterns E-Book",
    price: 49.99,
    icon: "candlestick",
    category: "ebook",
    description: "A focused digital guide to spotting and trading the chart patterns unique to forex pairs."
  },
  {
    id: "crypto-trading-course",
    name: "Crypto Trading Course",
    price: 99.99,
    icon: "graduation-cap",
    category: "course",
    description: "Step-by-step video course covering crypto market fundamentals, strategy, and risk management."
  },
  {
    id: "forex-trading-course",
    name: "Forex Trading Course",
    price: 499.99,
    icon: "trending-up",
    category: "course",
    description: "In-depth video course on forex market analysis, strategy building, and trade execution."
  },
  {
    id: "crypto-trading-bot",
    name: "Crypto Trading Bot",
    price: 299.99,
    icon: "bot",
    category: "bot",
    description: "Automated bot that executes crypto trades based on customizable strategy rules."
  },
  {
    id: "forex-trading-bot",
    name: "Forex Trading Bot",
    price: 999.99,
    icon: "gear",
    category: "bot",
    description: "Automated bot for the forex market, built for consistent, rules-based trade execution."
  }
];

const CATEGORY_LABELS = {
  ebook: "E-Book",
  course: "Course",
  bot: "Trading Bot"
};
