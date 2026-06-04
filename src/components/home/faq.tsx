import Link from "next/link";
import { FaqJsonLd } from "@/components/seo/structured-data";

interface HomeFaqItem {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

export const homeFaqItems: HomeFaqItem[] = [
  {
    question: "What is a Shopify store analyzer?",
    answer:
      "A Shopify store analyzer is a tool that inspects a Shopify store's public data to reveal its theme, installed apps, and store metadata. StoreTrace is a free Shopify store analyzer that delivers instant store analysis for any Shopify URL.",
  },
  {
    question: "How do I find which Shopify theme a store uses?",
    answer:
      "Enter the store URL in our Shopify store analyzer above, or use the dedicated Shopify Theme Detector. We scan the store HTML and identify the theme name, vendor, and Shopify Theme Store link.",
    link: { href: "/tools/theme-detector", label: "Try Theme Detector" },
  },
  {
    question: "What is a Shopify theme detector?",
    answer:
      "A Shopify theme detector identifies the theme powering a Shopify store. StoreTrace's theme detector parses Shopify.theme objects, asset paths, and theme store references to return accurate theme data with a confidence score.",
    link: { href: "/tools/theme-detector", label: "Open Theme Detector" },
  },
  {
    question: "Can I detect Shopify apps on a store?",
    answer:
      "Yes. Use our free Shopify App Detector to find apps like Klaviyo, Judge.me, Loox, and AfterShip on any store. The homepage store analyzer can also surface apps, theme, and store details in one scan.",
    link: { href: "/tools/app-detector", label: "App Detector" },
  },
  {
    question: "Is StoreTrace free to use?",
    answer:
      "Yes. StoreTrace is free during the MVP phase. You can analyze Shopify stores, detect themes, and view store intelligence reports at no cost.",
  },
  {
    question: "How is store analysis different from theme detection?",
    answer:
      "Theme detection focuses on identifying the Shopify theme only. Full Shopify store analysis includes the theme plus apps, currency, country, and store metadata — everything our store analyzer provides in one report.",
  },
];

export function FAQ() {
  return (
    <section
      className="bg-slate-50 py-16 sm:py-20"
      aria-labelledby="faq-heading"
    >
      <FaqJsonLd items={homeFaqItems} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id="faq-heading"
          className="text-center text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          Questions about our free Shopify store analyzer and store analysis
          reports.
        </p>
        <dl className="mt-10 space-y-4">
          {homeFaqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <dt className="text-lg font-semibold text-slate-900">
                {item.question}
              </dt>
              <dd className="mt-2 text-slate-600">
                {item.answer}
                {item.link && (
                  <>
                    {" "}
                    <Link
                      href={item.link.href}
                      className="font-medium text-brand hover:underline"
                    >
                      {item.link.label} →
                    </Link>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
