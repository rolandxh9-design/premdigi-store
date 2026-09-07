// Professional line-style icons used in place of emoji for product art.
// Referenced from products.js by key, rendered inline so they inherit
// the current theme's accent color via currentColor.
const ICONS = {
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 6.2c-1.6-1.1-4.1-1.6-6.2-1.3v12.4c2.1-.3 4.6.2 6.2 1.3 1.6-1.1 4.1-1.6 6.2-1.3V4.9c-2.1-.3-4.6.2-6.2 1.3z"/>
    <path d="M12 6.2v12.4"/>
  </svg>`,

  "graduation-cap": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 4 2 9l10 5 10-5-10-5z"/>
    <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/>
    <path d="M22 9v6"/>
  </svg>`,

  candlestick: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 3v3.5"/><rect x="4.5" y="6.5" width="3" height="6" rx="0.5"/><path d="M6 12.5v8.5"/>
    <path d="M12 2v3"/><rect x="10.5" y="5" width="3" height="9" rx="0.5"/><path d="M12 14v8"/>
    <path d="M18 6v3"/><rect x="16.5" y="9" width="3" height="6.5" rx="0.5"/><path d="M18 15.5V21"/>
  </svg>`,

  "trending-up": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 17l5-5 4 4 8-9"/>
    <path d="M15 7h5v5"/>
  </svg>`,

  bot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="8" width="16" height="11" rx="2.5"/>
    <path d="M12 8V4"/>
    <circle cx="12" cy="3" r="1"/>
    <circle cx="9" cy="13.2" r="1.1" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="13.2" r="1.1" fill="currentColor" stroke="none"/>
    <path d="M9 17h6"/>
    <path d="M2 12.5h2"/>
    <path d="M20 12.5h2"/>
  </svg>`,

  gear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 13a8.06 8.06 0 000-2l2-1.5-2-3.46-2.37 1a7.9 7.9 0 00-1.73-1L15 3H9l-.3 2.6a7.9 7.9 0 00-1.73 1l-2.37-1-2 3.46 2 1.5a8.06 8.06 0 000 2l-2 1.5 2 3.46 2.37-1c.53.43 1.11.77 1.73 1L9 21h6l.3-2.6a7.9 7.9 0 001.73-1l2.37 1 2-3.46-2-1.5z"/>
  </svg>`,

  coins: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="12" cy="6.5" rx="7" ry="3"/>
    <path d="M5 6.5v4.5c0 1.66 3.13 3 7 3s7-1.34 7-3V6.5"/>
    <path d="M5 11v5.5c0 1.66 3.13 3 7 3s7-1.34 7-3V11"/>
  </svg>`,

  // Header UI icons (cart, theme toggle)
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="9.5" cy="20" r="1"/>
    <circle cx="17.5" cy="20" r="1"/>
    <path d="M2.5 3h2l2.3 12a2 2 0 002 1.6h8a2 2 0 002-1.6L21 7.5H6.2"/>
  </svg>`,

  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2.5v2.3M12 19.2v2.3M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/>
  </svg>`,

  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.8 13.8A8.6 8.6 0 1110.2 3.2a7 7 0 0010.6 10.6z"/>
  </svg>`,

  // Admin sidebar icons
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="8" height="8" rx="1.5"/>
    <rect x="13" y="3" width="8" height="5" rx="1.5"/>
    <rect x="13" y="10" width="8" height="11" rx="1.5"/>
    <rect x="3" y="13" width="8" height="8" rx="1.5"/>
  </svg>`,

  receipt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 3h12v18l-2.5-1.5L13 21l-1-1.5L11 21l-2.5-1.5L6 21V3z"/>
    <path d="M9 8h6M9 12h6M9 16h4"/>
  </svg>`,

  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3.5 7.5 12 3l8.5 4.5L12 12z"/>
    <path d="M3.5 7.5V16l8.5 4.5V12"/>
    <path d="M20.5 7.5V16L12 20.5"/>
  </svg>`,

  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 6h16M4 12h16M4 18h16"/>
  </svg>`,

  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="9" cy="8" r="3.2"/>
    <path d="M2.8 19c.6-3.2 3.2-5 6.2-5s5.6 1.8 6.2 5"/>
    <circle cx="17" cy="8.5" r="2.4"/>
    <path d="M15.5 14c2.4.2 4.4 1.8 4.9 4.5"/>
  </svg>`,

  tag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12.5 3.5H6a2.5 2.5 0 00-2.5 2.5v6.5L13 22l9-9-9.5-9.5z"/>
    <circle cx="8.2" cy="8.2" r="1.4" fill="currentColor" stroke="none"/>
  </svg>`,

  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 13a8.06 8.06 0 000-2l2-1.5-2-3.46-2.37 1a7.9 7.9 0 00-1.73-1L15 3H9l-.3 2.6a7.9 7.9 0 00-1.73 1l-2.37-1-2 3.46 2 1.5a8.06 8.06 0 000 2l-2 1.5 2 3.46 2.37-1c.53.43 1.11.77 1.73 1L9 21h6l.3-2.6a7.9 7.9 0 001.73-1l2.37 1 2-3.46-2-1.5z"/>
  </svg>`
};
