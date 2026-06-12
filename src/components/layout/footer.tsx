import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { siteConfig } from "@/lib/utils/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo height={26} href="/" />
            <p className="mt-3 text-sm text-slate-600">
              Free Shopify store analyzer — discover themes, apps, and store
              insights for any Shopify store.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Tools</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-brand">
                  Shopify Store Analyzer
                </Link>
              </li>
              <li>
                <Link href="/tools/theme-detector" className="hover:text-brand">
                  Theme Detector
                </Link>
              </li>
              <li>
                <Link href="/tools/app-detector" className="hover:text-brand">
                  App Detector
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Database</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/themes" className="hover:text-brand">
                  Themes
                </Link>
              </li>
              <li>
                <Link href="/apps" className="hover:text-brand">
                  Apps
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-brand">
                  Stores
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-brand">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <Link href="/privacy" className="hover:text-brand">
            Privacy
          </Link>
          <span aria-hidden>·</span>
          <Link href="/terms" className="hover:text-brand">
            Terms
          </Link>
          <span aria-hidden>·</span>
          <Link href="/about" className="hover:text-brand">
            About
          </Link>
          <span aria-hidden>·</span>
          <Link href="/contact" className="hover:text-brand">
            Contact
          </Link>
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}. Shopify Store
          Intelligence Platform.
        </p>
      </div>
    </footer>
  );
}
