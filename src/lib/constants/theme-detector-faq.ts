export const themeDetectorFaqItems = [
  {
    question: "What is a Shopify theme?",
    answer:
      "A Shopify theme is the design template that controls how your store looks and feels — layouts for the homepage, product pages, collections, fonts, colors, and navigation. You choose a theme from the Shopify Theme Store (or use a custom one), then customize it in the theme editor without rebuilding the whole site from scratch.",
  },
  {
    question: "What is a Shopify theme detector?",
    answer:
      "A Shopify theme detector is a free online tool that tells you which theme a Shopify store is using. You paste a store URL and get the theme name, developer, Theme Store link when available, and a confidence score — useful for competitor research or choosing your own template.",
  },
  {
    question: "How do I find out which Shopify theme a website is using?",
    answer:
      "Paste the store URL into the detector at the top of this page and click Detect Shopify Theme. Results appear in seconds on our store analysis page. You can also search page source for Shopify.theme manually — our guide on the blog explains both methods.",
  },
  {
    question: "What is the Shopify Theme Store?",
    answer:
      "The Shopify Theme Store is Shopify’s official marketplace for themes. Some themes are free (like Dawn), most premium themes are a one-time purchase built by Shopify or third-party developers. When we detect a listed theme, we link you straight to its store page to preview and install.",
  },
  {
    question: "How can I tell if a website is a Shopify store?",
    answer:
      "Try our detector with the site URL — if it’s Shopify, you’ll get theme results. Other clues: a myshopify.com subdomain on checkout, “Powered by Shopify” in the footer on some stores, or searching page source (Ctrl+U) for “shopify”. Not every clue appears on every store, so the detector is the quickest check.",
  },
  {
    question: "Are there free Shopify themes?",
    answer:
      "Yes. Shopify offers free Online Store 2.0 themes such as Dawn, Refresh, and Sense. Premium themes add more sections and niche layouts but require a one-time fee. Many merchants start free and upgrade once sales grow.",
  },
  {
    question: "Can it detect custom or renamed Shopify themes?",
    answer:
      "Often yes. Large brands sometimes use custom themes not sold on the Theme Store. We still report the theme name found in public code and show confidence so you know how reliable the match is. A missing Theme Store link usually means custom or heavily forked code.",
  },
  {
    question: "Does this tool also detect Shopify apps?",
    answer:
      "Yes. The same scan can surface apps we find in public storefront code — reviews, email, tracking, and more. Open the Apps tab on the result page, or use our dedicated Shopify App Detector for app-focused research.",
  },
  {
    question: "Is this Shopify theme checker free?",
    answer:
      "Completely free. No account or credit card. Enter any public Shopify store URL and run a theme check as often as you need.",
  },
] as const;
