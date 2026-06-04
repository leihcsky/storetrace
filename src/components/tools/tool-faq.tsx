import { FaqJsonLd } from "@/components/seo/structured-data";

interface ToolFaqProps {
  heading: string;
  subheading: string;
  items: ReadonlyArray<{ question: string; answer: string }>;
  className?: string;
}

export function ToolFaq({
  heading,
  subheading,
  items,
  className = "bg-white py-16 sm:py-20",
}: ToolFaqProps) {
  return (
    <section className={className} aria-labelledby="tool-faq-heading">
      <FaqJsonLd items={[...items]} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id="tool-faq-heading"
          className="text-center text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          {subheading}
        </p>
        <dl className="mt-10 space-y-4">
          {items.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm"
            >
              <dt className="text-lg font-semibold text-slate-900">
                {item.question}
              </dt>
              <dd className="mt-2 text-slate-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
