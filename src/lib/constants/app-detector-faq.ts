export const appDetectorFaqItems = [
  {
    question: "What is a Shopify app detector?",
    answer:
      "A Shopify app detector is a free tool that scans a store's public code to identify installed apps — such as review widgets, email marketing, upsell tools, and order tracking. Enter a URL and get a list of apps we can match.",
  },
  {
    question: "How do I see what apps a Shopify store uses?",
    answer:
      "Paste the store URL into the Shopify App Detector above and click Detect Apps. You'll see detected app names, categories, and App Store links when available.",
  },
  {
    question: "Is this Shopify app detector free?",
    answer:
      "Yes — completely free. No account required. Just enter a public Shopify store URL and run a scan.",
  },
  {
    question: "Can you detect every Shopify app?",
    answer:
      "No tool can catch 100% of apps. We detect apps that leave visible scripts or widgets on the storefront. Server-only or fully custom apps may not show up.",
  },
  {
    question: "Which apps can you usually detect?",
    answer:
      "We often identify popular apps such as Klaviyo, Judge.me, Loox, Yotpo, AfterShip, Omnisend, Rebuy, and Gorgias. Our app library grows as we add more signatures.",
  },
  {
    question: "Does app detection include theme information?",
    answer:
      "Your scan can also surface theme and store details when publicly available. Use our theme detector if you only need the theme, or the homepage analyzer for a full overview.",
  },
] as const;
