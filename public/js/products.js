// Edit this list to add, remove, or change products.
// id must be unique — it's used in the URL (product.html?id=...).
// All products are digital downloads. Prices are in USD ($).
// category drives the badge label and accent color (see CATEGORY_LABELS below
// and the .cat-* rules in css/style.css) — use "ebook", "course", or "bot".
//
// tagline/description/highlightsTitle/highlights/audience are shown on the
// product detail page (product.html); the homepage grid only shows tagline.
const PRODUCTS = [
  {
    id: "crypto-patterns-ebook",
    name: "Crypto Trading Patterns",
    price: 9.99,
    icon: "coins",
    category: "ebook",
    tagline: "Spot the patterns. Trade with confidence.",
    description: "Learn how to identify key chart patterns in the crypto market and use them to build a more structured approach to technical analysis.",
    highlightsTitle: "What's inside",
    highlights: [
      "Essential crypto chart patterns",
      "Bullish and bearish setups",
      "Entry and exit concepts",
      "Practical technical-analysis examples",
      "Tips for improving your chart-reading skills"
    ],
    audience: "Perfect for beginners and developing traders who want to better understand crypto price action."
  },
  {
    id: "forex-patterns-ebook",
    name: "Forex Trading Patterns",
    price: 49.99,
    icon: "candlestick",
    category: "ebook",
    tagline: "Understand the market. Trade smarter.",
    description: "Build your forex chart-reading skills with a focused guide to important trading patterns. Learn how to identify potential setups, understand price action, and approach technical analysis with greater confidence.",
    highlightsTitle: "What's inside",
    highlights: [
      "Essential forex chart patterns",
      "Bullish and bearish setups",
      "Entry and exit concepts",
      "Practical forex chart examples",
      "Tips for developing a more systematic trading approach"
    ],
    audience: "Perfect for traders who want to move beyond the basics and strengthen their forex analysis."
  },
  {
    id: "crypto-trading-course",
    name: "Crypto Trading Course",
    price: 99.99,
    icon: "graduation-cap",
    category: "course",
    tagline: "Build your crypto trading knowledge from the ground up.",
    description: "A structured course designed to help you understand crypto markets, develop a trading plan, and approach trades with better discipline.",
    highlightsTitle: "What you'll learn",
    highlights: [
      "How crypto markets work",
      "Technical analysis and chart patterns",
      "Risk management and position sizing",
      "Trading strategies and market psychology",
      "How to build and test a personal trading plan"
    ],
    audience: "Perfect for beginners and intermediate traders looking to develop a more structured approach."
  },
  {
    id: "forex-trading-course",
    name: "Forex Trading Course",
    price: 499.99,
    icon: "trending-up",
    category: "course",
    tagline: "Develop a deeper understanding of the forex market.",
    description: "A comprehensive forex trading course focused on market analysis, strategy development, and the discipline needed to trade responsibly.",
    highlightsTitle: "What you'll learn",
    highlights: [
      "Forex market fundamentals",
      "Technical and fundamental analysis",
      "Price action and trading setups",
      "Risk management and trade planning",
      "Trading psychology and consistency",
      "How to evaluate and improve your strategy"
    ],
    audience: "Perfect for traders who want to move beyond the basics and build a more complete trading framework."
  },
  {
    id: "crypto-trading-bot",
    name: "Crypto Trading Bot",
    price: 299.99,
    icon: "bot",
    category: "bot",
    tagline: "Automate your strategy. Stay consistent with your rules.",
    description: "A crypto trading bot designed to help traders automate predefined strategies and reduce the need to monitor the market manually.",
    highlightsTitle: "Product highlights",
    highlights: [
      "Automated execution based on configured rules",
      "Strategy-focused trading approach",
      "Customizable trading parameters",
      "Designed to support a more systematic workflow",
      "Suitable for traders who understand the risks of automated trading"
    ],
    audience: "Perfect for crypto traders who want to explore automation and improve their trading workflow."
  },
  {
    id: "forex-trading-bot",
    name: "Forex Trading Bot",
    price: 999.99,
    icon: "gear",
    category: "bot",
    tagline: "Bring structure and automation to your forex trading.",
    description: "A premium forex trading bot built for traders who want to automate a defined trading strategy and manage their trading process more systematically.",
    highlightsTitle: "Product highlights",
    highlights: [
      "Automated forex trade execution",
      "Configurable strategy parameters",
      "Systematic approach to market opportunities",
      "Designed to reduce manual monitoring",
      "Suitable for traders with a clear understanding of forex risk"
    ],
    audience: "Perfect for experienced traders looking to explore algorithmic trading and automation."
  }
];

const CATEGORY_LABELS = {
  ebook: "E-Book",
  course: "Course",
  bot: "Trading Bot"
};
