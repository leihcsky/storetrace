import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { LEGAL_LAST_UPDATED, legalContact } from "@/lib/constants/legal";
import { createPageMetadata } from "@/lib/utils/metadata";
import { siteConfig } from "@/lib/utils/site";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms governing use of StoreTrace, our free Shopify store analyzer, theme detector, and app detector tools.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description={`Please read these terms before using ${siteConfig.name}.`}
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use
        of {siteConfig.url} and related services (collectively, the
        &quot;Service&quot;) operated by {siteConfig.name}
        (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By using the
        Service, you agree to these Terms and our{" "}
        <Link href="/privacy" className="text-brand hover:underline">
          Privacy Policy
        </Link>
        . If you do not agree, do not use the Service.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be able to form a binding contract in your jurisdiction to use
        the Service. You are responsible for compliance with applicable laws.
      </p>

      <h2>The Service</h2>
      <p>
        {siteConfig.name} provides free tools to analyze public Shopify
        storefronts, including theme and app detection. The Service is offered
        for informational and research purposes. We may change, suspend, or
        discontinue features at any time without notice.
      </p>

      <h2>No affiliation with Shopify</h2>
      <p>
        {siteConfig.name} is an independent tool and is not affiliated with,
        endorsed by, or sponsored by Shopify Inc. Shopify® is a trademark of
        Shopify Inc. Theme, app, and store names belong to their respective
        owners.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          Use the Service for unlawful, fraudulent, or harmful purposes.
        </li>
        <li>
          Attempt to access non-public areas, bypass rate limits, or interfere
          with the Service&apos;s operation.
        </li>
        <li>
          Scrape, bulk-harvest, or automate requests in a way that imposes
          unreasonable load on our systems or third-party stores.
        </li>
        <li>
          Misrepresent scan results as official statements by Shopify or by the
          analyzed store.
        </li>
        <li>
          Collect or process personal data from analyzed stores beyond what is
          already publicly displayed on the storefront.
        </li>
        <li>
          Reverse engineer the Service except where permitted by applicable law.
        </li>
      </ul>

      <h2>Analysis results and disclaimers</h2>
      <p>
        Detection is based on public signals and heuristics. Results may be
        incomplete, outdated, or incorrect—especially for custom themes,
        headless storefronts, or apps without front-end footprints.{" "}
        <strong>
          The Service is provided &quot;as is&quot; and &quot;as available&quot;
          without warranties of any kind
        </strong>
        , whether express or implied, including merchantability, fitness for a
        particular purpose, accuracy, or non-infringement.
      </p>
      <p>
        You use analysis results at your own risk. We do not provide legal,
        business, security, or investment advice.
      </p>

      <h2>Third-party sites and services</h2>
      <p>
        The Service may link to third-party websites (including the Shopify App
        Store, Theme Store, and analyzed stores). We are not responsible for
        third-party content, policies, or practices. Your use of third-party
        services is governed by their terms.
      </p>

      <h2>Intellectual property</h2>
      <p>
        We own or license the Service, including its design, code, branding, and
        documentation. You may not copy, modify, distribute, or create
        derivative works except as allowed by law or with our written permission.
        Scan reports may contain third-party trademarks and assets; those remain
        the property of their owners.
      </p>

      <h2>Feedback</h2>
      <p>
        If you send suggestions or feedback, you grant us a non-exclusive,
        royalty-free license to use it to improve the Service without obligation
        to you.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {siteConfig.name} and its
        operators will not be liable for any indirect, incidental, special,
        consequential, or punitive damages, or for loss of profits, data, or
        goodwill, arising from your use of the Service. Our total liability for
        any claim relating to the Service will not exceed one hundred U.S.
        dollars (USD $100) or the amount you paid us in the twelve months before
        the claim—whichever is greater. Because the Service is free, that amount
        is typically zero.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {siteConfig.name} from claims,
        damages, and expenses (including reasonable legal fees) arising from your
        misuse of the Service or violation of these Terms.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate access to the Service at any time if we
        believe you violated these Terms or pose a risk to the Service or others.
        Sections that by nature should survive termination will survive.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws applicable in our place of
        operation, without regard to conflict-of-law rules. Disputes will be
        resolved in the courts of that jurisdiction, unless mandatory consumer
        protection laws in your country require otherwise.
      </p>

      <h2>Changes</h2>
      <p>
        We may revise these Terms from time to time. Continued use after changes
        are posted constitutes acceptance of the updated Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a
          href={`mailto:${legalContact.general}`}
          className="text-brand hover:underline"
        >
          {legalContact.general}
        </a>
        {" · "}
        <Link href="/contact" className="text-brand hover:underline">
          Contact page
        </Link>
        .
      </p>
    </LegalPage>
  );
}
