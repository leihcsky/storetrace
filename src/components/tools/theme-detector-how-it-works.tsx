const steps = [
  {
    step: "1",
    title: "Paste a Shopify store URL",
    description:
      "Enter any public storefront you want to check — homepage or product page.",
  },
  {
    step: "2",
    title: "We detect the Shopify theme",
    description:
      "Our Shopify Theme Detector scans the live site to detect Shopify theme signals in code and assets.",
  },
  {
    step: "3",
    title: "Get your results",
    description:
      "See theme name, vendor, Theme Store link, and confidence score — ready to compare or install.",
  },
];

export function ThemeDetectorHowItWorks() {
  return (
    <section
      className="bg-slate-50 py-16 sm:py-20"
      aria-labelledby="theme-detector-how-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="theme-detector-how-heading"
          className="text-center text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          How the Shopify Theme Detector Works
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Detect Shopify theme in three steps with our free Shopify Theme
          Detector — no login required.{" "}
          <a
            href="/blog/shopify-theme-detector-guide"
            className="font-medium text-brand hover:underline"
          >
            Read how detection works
          </a>
          .
        </p>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <li key={item.step} className="relative text-center">
              {index < steps.length - 1 && (
                <span
                  className="absolute left-[calc(50%+2rem)] top-8 hidden h-0.5 w-[calc(100%-4rem)] bg-brand-muted md:block"
                  aria-hidden
                />
              )}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
