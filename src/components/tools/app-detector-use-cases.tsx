import Link from "next/link";

const useCases = [
  {
    title: "Competitor stack research",
    body: "See which email, reviews, and upsell apps rivals rely on before you build your own stack.",
  },
  {
    title: "Agency discovery calls",
    body: "Document a merchant's current app setup quickly when scoping migrations or audits.",
  },
  {
    title: "Dropshipping & DTC launches",
    body: "Copy proven app combinations from stores in your niche that already convert well.",
  },
  {
    title: "Due diligence",
    body: "Check whether a store runs lean or depends on many paid apps before you acquire or partner.",
  },
];

export function AppDetectorUseCases() {
  return (
    <section
      className="py-16 sm:py-20"
      aria-labelledby="app-use-cases-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2
              id="app-use-cases-heading"
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Why Use a Shopify App Detector?
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Apps handle reviews, email flows, subscriptions, search, and
              checkout extras — but they are invisible on the surface. A Shopify
              app detector reveals what is actually running so you can make
              smarter build-or-buy decisions.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Want theme and catalog data too? Try our{" "}
              <Link href="/" className="font-medium text-brand hover:underline">
                Shopify store analyzer
              </Link>{" "}
              for a complete picture of any store.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {useCases.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
