import { Link2, Puzzle, Star, Tag } from "lucide-react";

const features = [
  {
    icon: Puzzle,
    title: "App names",
    description:
      "See which Shopify apps are active on the storefront — reviews, email, upsell, tracking, and more.",
  },
  {
    icon: Star,
    title: "Ratings & reviews",
    description:
      "When we match a known app, view App Store ratings and review counts to gauge popularity.",
  },
  {
    icon: Tag,
    title: "Category & pricing",
    description:
      "Understand what each app does and whether it offers a free plan or trial before you install.",
  },
  {
    icon: Link2,
    title: "Shopify App Store link",
    description:
      "Open the official listing for each detected app to read details and install on your own store.",
  },
];

export function AppDetectorFeatures() {
  return (
    <section
      className="py-16 sm:py-20"
      aria-labelledby="app-detector-features-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="app-detector-features-heading"
          className="text-center text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          What Our Shopify App Detector Finds
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          A clear list of apps powering reviews, marketing, search, and
          conversions on any Shopify store you analyze.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-muted hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
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
