import Link from "next/link";

const manualSteps = [
  {
    step: "1",
    title: "Open the store in your browser",
    body: "Load the homepage or a product page — many apps inject scripts on every page.",
  },
  {
    step: "2",
    title: "View page source or DevTools",
    body: "Right-click → View page source (Ctrl+U), or open Developer Tools → Network and reload the page.",
  },
  {
    step: "3",
    title: "Search for known app domains",
    body: "Use Ctrl+F to search for clues such as klaviyo, judge.me, yotpo, aftership, rebuy, or cdn.shopify.com paths that include app names.",
  },
  {
    step: "4",
    title: "Check script and iframe URLs",
    body: "Third-party apps often load JavaScript from their own domains. Note each unique hostname and look it up in the Shopify App Store.",
  },
];

const commonSignals = [
  "klaviyo.com — email & SMS marketing",
  "judge.me / jdgm — product reviews",
  "loox.io — visual reviews",
  "yotpo.com — reviews & loyalty",
  "aftership.com — order tracking",
];

export function AppDetectorAppsGuide() {
  return (
    <section
      className="border-t border-slate-200 bg-white py-16 sm:py-20"
      aria-labelledby="app-guide-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id="app-guide-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          What Shopify Apps Is That Store Using?
        </h2>

        <div className="mt-6 space-y-5 leading-relaxed text-slate-600">
          <p>
            A polished Shopify storefront often runs more than the theme you
            see. Behind the scenes, apps power pop-ups, reviews, email capture,
            upsells, analytics, and shipping updates. If you have ever asked{" "}
            <strong className="font-medium text-slate-800">
              what Shopify apps a store is using
            </strong>
            , you are not alone — it is one of the most common questions in
            ecommerce research.
          </p>
          <p>
            Unlike themes, apps do not always announce themselves in the
            footer. They load through scripts and widgets embedded in the page.
            That is why a dedicated{" "}
            <strong className="font-medium text-slate-800">
              Shopify app detector
            </strong>{" "}
            saves time compared to guessing from the UI alone.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900">
            The fast way: use our Shopify app detector
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Paste the store URL at the top of this page and click Detect Apps.
            You get a list of apps we can identify from public code, with
            ratings and App Store links when available — much faster than
            hunting through dozens of script tags by hand.
          </p>
          <p className="mt-3">
            <a
              href="#app-detector-hero-heading"
              className="text-sm font-semibold text-brand hover:underline"
            >
              Jump to app detector ↑
            </a>
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-slate-900">
            How to find Shopify apps manually
          </h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            You can inspect a store yourself when you want to double-check
            results or learn how apps leave traces. Not every app is visible —
            some run server-side only — but many popular apps are easy to spot.
          </p>

          <ol className="mt-8 space-y-4">
            {manualSteps.map((item) => (
              <li
                key={item.step}
                className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
                  {item.step}
                </span>
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Domains you might see in source code
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              {commonSignals.map((line) => (
                <li key={line}>
                  <code className="rounded bg-white px-1.5 py-0.5 text-xs">
                    {line.split(" — ")[0]}
                  </code>
                  <span className="text-slate-500">
                    {" "}
                    — {line.split(" — ")[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 space-y-4 leading-relaxed text-slate-600">
          <h3 className="text-lg font-semibold text-slate-900">
            Limits of app detection
          </h3>
          <p>
            Detection only covers apps that leave public footprints in the
            storefront. Custom private apps, headless setups, or server-only
            integrations may not appear. Treat results as a strong starting
            point, not a complete inventory of every tool the merchant pays
            for.
          </p>
          <p>
            Explore{" "}
            <Link href="/apps" className="font-medium text-brand hover:underline">
              popular Shopify apps
            </Link>{" "}
            we often detect, or compare with our{" "}
            <Link
              href="/tools/theme-detector"
              className="font-medium text-brand hover:underline"
            >
              theme detector
            </Link>{" "}
            if you also need to know which theme powers the same store.
          </p>
        </div>
      </div>
    </section>
  );
}
