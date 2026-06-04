const steps = [
  {
    step: "1",
    title: "Paste a Shopify store URL",
    description:
      "Enter any public storefront into the Shopify store analyzer — brand domain or myshopify.com.",
  },
  {
    step: "2",
    title: "Run store analysis",
    description:
      "We fetch the live site and analyze themes, apps, and store metadata from public code.",
  },
  {
    step: "3",
    title: "Review your report",
    description:
      "Open theme, apps, and overview tabs — one Shopify store analysis report per scan.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="how-it-works-heading"
          className="text-center text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          How the Shopify Store Analyzer Works
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Three steps from URL to a full Shopify store analysis report — free
          and instant.
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
