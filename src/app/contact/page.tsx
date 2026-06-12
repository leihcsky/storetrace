import Link from "next/link";
import { Mail } from "lucide-react";
import { LegalPage } from "@/components/legal/legal-page";
import { LEGAL_LAST_UPDATED, legalContact } from "@/lib/constants/legal";
import { createPageMetadata } from "@/lib/utils/metadata";
import { siteConfig } from "@/lib/utils/site";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact StoreTrace for support, privacy requests, partnerships, or feedback about our Shopify store analyzer.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact Us"
      description={`Get in touch with the ${siteConfig.name} team.`}
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <p>
        We read every message and aim to respond within a few business days.
        Before writing, you may find answers in our{" "}
        <Link href="/" className="text-brand hover:underline">
          homepage FAQ
        </Link>{" "}
        or on the{" "}
        <Link href="/blog" className="text-brand hover:underline">
          blog
        </Link>
        .
      </p>

      <div className="grid gap-4 sm:grid-cols-2 not-prose">
        <a
          href={`mailto:${legalContact.general}`}
          className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-muted hover:shadow-md"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
            <Mail className="h-5 w-5" aria-hidden />
          </span>
          <span>
            <span className="block font-semibold text-slate-900">
              General inquiries
            </span>
            <span className="mt-1 block text-sm text-brand">
              {legalContact.general}
            </span>
            <span className="mt-2 block text-sm text-slate-500">
              Support, feedback, partnerships, and press.
            </span>
          </span>
        </a>

        <a
          href={`mailto:${legalContact.privacy}`}
          className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-muted hover:shadow-md"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
            <Mail className="h-5 w-5" aria-hidden />
          </span>
          <span>
            <span className="block font-semibold text-slate-900">
              Privacy requests
            </span>
            <span className="mt-1 block text-sm text-brand">
              {legalContact.privacy}
            </span>
            <span className="mt-2 block text-sm text-slate-500">
              Data access, correction, or deletion under our Privacy Policy.
            </span>
          </span>
        </a>
      </div>

      <h2>What to include</h2>
      <ul>
        <li>
          <strong>Support:</strong> the store URL you scanned, what you expected
          to see, and screenshots if helpful.
        </li>
        <li>
          <strong>Privacy:</strong> the email or identifier you used (if any) and
          the nature of your request.
        </li>
        <li>
          <strong>Abuse reports:</strong> the URL or behavior in question and why
          you believe it violates our Terms.
        </li>
      </ul>

      <p className="text-sm text-slate-500">
        {siteConfig.name} does not offer phone support. We do not provide
        Shopify store setup, theme customization, or app installation services.
      </p>
    </LegalPage>
  );
}
