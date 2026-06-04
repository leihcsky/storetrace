import {
  BadgeCheck,
  Link2,
  Palette,
  Store,
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Theme name",
    description:
      "Identify the Shopify theme powering the store — including custom themes, Dawn derivatives, and premium Theme Store builds.",
  },
  {
    icon: Store,
    title: "Theme vendor",
    description:
      "See whether the theme comes from Shopify, a Theme Store partner, or a custom build not listed on the Theme Store.",
  },
  {
    icon: Link2,
    title: "Theme Store link",
    description:
      "When the theme is on the Shopify Theme Store, get a direct link to preview, compare pricing, and install.",
  },
  {
    icon: BadgeCheck,
    title: "Confidence score",
    description:
      "See how sure we are about the match — helpful when stores use heavily customized themes.",
  },
];

export function ThemeDetectorFeatures() {
  return (
    <section
      className="py-16 sm:py-20"
      aria-labelledby="theme-detector-features-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="theme-detector-features-heading"
          className="text-center text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          What Our Shopify Theme Detector Finds
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          When you detect Shopify theme on a competitor or inspiration store,
          our Shopify Theme Detector surfaces everything useful in one quick
          check.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-muted hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
