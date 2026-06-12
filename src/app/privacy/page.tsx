import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { LEGAL_LAST_UPDATED, legalContact } from "@/lib/constants/legal";
import { createPageMetadata } from "@/lib/utils/metadata";
import { siteConfig } from "@/lib/utils/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How StoreTrace collects, uses, and protects information when you use our free Shopify store analyzer and website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description={`This policy explains how ${siteConfig.name} handles information when you visit our website or run a store analysis.`}
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <p>
        {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
        operates {siteConfig.url} and related tools that analyze public Shopify
        storefronts. By using the site, you agree to this Privacy Policy. If you
        do not agree, please do not use the service.
      </p>

      <h2>Information we collect</h2>

      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Store URLs</strong> — When you submit a URL for analysis, we
          process that address to fetch public pages and generate a report.
        </li>
        <li>
          <strong>Contact messages</strong> — If you email us, we receive the
          content of your message and your email address.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Scan results</strong> — We may store analysis outputs (such as
          domain, detected theme, apps, and related metadata) to power store
          report pages and improve the service.
        </li>
        <li>
          <strong>Usage and device data</strong> — Standard server and application
          logs may include IP address, browser type, referring page, pages
          viewed, and timestamps.
        </li>
        <li>
          <strong>Analytics</strong> — We use Google Analytics to understand how
          visitors use the site. Google may set cookies and collect usage data
          according to{" "}
          <a
            href="https://policies.google.com/privacy"
            className="text-brand hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>Run store analyses and display results to you and other visitors.</li>
        <li>Operate, maintain, secure, and improve {siteConfig.name}.</li>
        <li>Respond to support and privacy requests.</li>
        <li>Monitor usage trends and fix errors.</li>
        <li>Comply with legal obligations and enforce our Terms of Service.</li>
      </ul>

      <h2>Legal bases (EEA / UK visitors)</h2>
      <p>
        Where applicable, we rely on: (a) performance of a service you request
        (running an analysis); (b) legitimate interests in operating and
        improving a free research tool; and (c) consent where required for
        non-essential cookies or analytics.
      </p>

      <h2>What we analyze on third-party stores</h2>
      <p>
        When you request an analysis, our systems access publicly available
        storefront content—the same material available to any internet user. We
        do not log into Shopify admin accounts or collect private customer data
        from analyzed stores. Store owners who have questions about a scan may
        contact us at{" "}
        <a
          href={`mailto:${legalContact.privacy}`}
          className="text-brand hover:underline"
        >
          {legalContact.privacy}
        </a>
        .
      </p>

      <h2>Sharing of information</h2>
      <p>We do not sell your personal information. We may share data with:</p>
      <ul>
        <li>
          <strong>Service providers</strong> — Hosting, database, analytics, and
          infrastructure vendors that process data on our behalf under
          contractual safeguards.
        </li>
        <li>
          <strong>Legal requirements</strong> — When required by law, court
          order, or to protect rights, safety, and security.
        </li>
        <li>
          <strong>Business transfers</strong> — In connection with a merger,
          acquisition, or asset sale, subject to continued protection of
          personal information.
        </li>
      </ul>

      <h2>Retention</h2>
      <p>
        We keep scan results and logs only as long as needed for the purposes
        above, unless a longer period is required by law. You may request
        deletion of information associated with you as described below.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        We use cookies and similar technologies for essential site operation and
        analytics. You can control cookies through your browser settings.
        Blocking cookies may affect some features. Where required, we will present
        additional consent options for non-essential tracking.
      </p>

      <h2>Your rights and choices</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        delete, or restrict processing of personal information, or to object to
        certain processing. To exercise these rights, email{" "}
        <a
          href={`mailto:${legalContact.privacy}`}
          className="text-brand hover:underline"
        >
          {legalContact.privacy}
        </a>
        . We may need to verify your request. EEA/UK residents may also lodge a
        complaint with a local supervisory authority.
      </p>

      <h2>Children</h2>
      <p>
        {siteConfig.name} is not directed to children under 16, and we do not
        knowingly collect personal information from children.
      </p>

      <h2>International transfers</h2>
      <p>
        We may process information in countries other than your own. Where
        required, we use appropriate safeguards for cross-border transfers.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect
        information. No method of transmission or storage is completely secure.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last
        updated&quot; date at the top reflects the latest revision. Material
        changes will be posted on this page.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions:{" "}
        <a
          href={`mailto:${legalContact.privacy}`}
          className="text-brand hover:underline"
        >
          {legalContact.privacy}
        </a>
        . General inquiries:{" "}
        <Link href="/contact" className="text-brand hover:underline">
          Contact page
        </Link>
        .
      </p>
    </LegalPage>
  );
}
