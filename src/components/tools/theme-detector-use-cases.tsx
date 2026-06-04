import Link from "next/link";

const useCases = [
  {
    title: "Competitor research",
    body: "See which Shopify theme successful brands use before you replatform or redesign your own store.",
  },
  {
    title: "Agency & freelance audits",
    body: "Quickly document a client's current theme setup when scoping migrations or CRO projects.",
  },
  {
    title: "Theme inspiration",
    body: "Find real stores running themes you are considering from the Shopify Theme Store.",
  },
  {
    title: "Due diligence",
    body: "Verify whether a store runs a stock theme, a premium theme, or a heavily customized build.",
  },
];

export function ThemeDetectorUseCases() {
  return (
    <section
      className="py-16 sm:py-20"
      aria-labelledby="theme-use-cases-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2
              id="theme-use-cases-heading"
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Why Use a Shopify Theme Detector?
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Whether you need to detect Shopify theme on a competitor, plan a
              redesign, or validate a store before acquisition, knowing the
              underlying theme saves hours of manual inspection. This Shopify
              Theme Detector turns that into a one-click check with a clear,
              shareable report.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              New to theme detection? Read our{" "}
              <Link
                href="/blog/shopify-theme-detector-guide"
                className="font-medium text-brand hover:underline"
              >
                Shopify theme detector guide
              </Link>
              . Want apps and store details too? Try our{" "}
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
