import Link from "next/link";

const manualSteps = [
  {
    step: "1",
    title: "Open the store in your browser",
    body: "Visit the Shopify storefront you want to research — any product or homepage URL works.",
  },
  {
    step: "2",
    title: "View the page source",
    body: "Right-click the page and choose “View page source”, or press Ctrl+U (Cmd+Option+U on Mac).",
  },
  {
    step: "3",
    title: "Search for Shopify.theme",
    body: "Use Ctrl+F (Cmd+F on Mac) and search for Shopify.theme. Many stores expose a line like Shopify.theme = {\"name\":\"ThemeName\",...}.",
  },
  {
    step: "4",
    title: "Read the theme name",
    body: "The name field in that snippet is often the theme identifier. Custom or renamed themes may use internal names — compare with what you see in the storefront design.",
  },
];

export function ThemeDetectorThemeGuide() {
  return (
    <section
      className="border-t border-slate-200 bg-white py-16 sm:py-20"
      aria-labelledby="theme-guide-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id="theme-guide-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          What Shopify Theme Is That Site Using?
        </h2>

        <div className="mt-6 space-y-5 text-slate-600 leading-relaxed">
          <p>
            You spot a Shopify store with a layout you love — clean product
            pages, strong typography, a checkout flow that feels trustworthy —
            and the first question is almost always the same:{" "}
            <strong className="font-medium text-slate-800">
              what Shopify theme is that site using?
            </strong>
          </p>
          <p>
            The theme controls how products, collections, and content are
            presented. When you detect Shopify theme on a site you admire,
            you can shortlist proven layouts instead of guessing from hundreds
            of options in the{" "}
            <a
              href="https://themes.shopify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand hover:underline"
            >
              Shopify Theme Store
            </a>
            .
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-muted bg-brand-light/40 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900">
            The fast way: detect Shopify theme with our tool
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Paste the store URL into the Shopify Theme Detector at the top of
            this page. You get the theme name, developer, Theme Store link when
            available, and a confidence score — without digging through source
            code. That is the quickest way to detect Shopify theme when you
            research competitors or shortlist themes for a new store.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href="#theme-detector-hero-heading"
              className="text-sm font-semibold text-brand hover:underline"
            >
              Jump to theme detector ↑
            </a>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <Link
              href="/blog/shopify-theme-detector-guide"
              className="text-sm font-semibold text-brand hover:underline"
            >
              Full theme detector guide →
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-slate-900">
            How to find a Shopify theme manually
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Developers sometimes check the theme directly in the page source.
            It works on many stores, though heavily customized or headless setups
            may hide or rename signals. Our{" "}
            <Link
              href="/blog/how-to-find-shopify-theme"
              className="font-medium text-brand hover:underline"
            >
              manual theme detection guide
            </Link>{" "}
            covers DevTools and edge cases in full. Here is the short version:
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
              Example (format varies by store)
            </p>
            <pre className="mt-2 overflow-x-auto text-sm text-slate-700">
              <code>{`Shopify.theme = {"name":"Dawn","id":123456789,...};`}</code>
            </pre>
          </div>
        </div>

        <div className="mt-12 space-y-4 text-slate-600 leading-relaxed">
          <h3 className="text-lg font-semibold text-slate-900">
            After you know the theme name
          </h3>
          <p>
            Look up the theme on the Theme Store or the developer&apos;s site.
            Compare demos with your catalog size, brand style, and the apps you
            plan to use. Free themes such as Dawn suit many new stores; premium
            themes often add richer layouts and built-in merchandising sections.
          </p>
          <p>
            If the name looks unfamiliar, the store may use a{" "}
            <strong className="font-medium text-slate-800">
              custom or white-label theme
            </strong>{" "}
            — common for larger brands. In that case, treat the result as a clue
            and focus on layout patterns you want to replicate rather than an
            exact template to install.
          </p>
          <p>
            Browse our{" "}
            <Link href="/themes" className="font-medium text-brand hover:underline">
              popular Shopify themes
            </Link>{" "}
            for vetted options, or run a full{" "}
            <Link href="/" className="font-medium text-brand hover:underline">
              store analysis
            </Link>{" "}
            to see theme, apps, and catalog signals together.
          </p>
        </div>
      </div>
    </section>
  );
}
