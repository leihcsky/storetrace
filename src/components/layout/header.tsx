import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Palette,
  Puzzle,
  Layers,
  Package,
  BookOpen,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tools/theme-detector", label: "Theme Detector", icon: Palette },
  { href: "/tools/app-detector", label: "App Detector", icon: Puzzle },
  { href: "/themes", label: "Themes", icon: Layers },
  { href: "/apps", label: "Apps", icon: Package },
  { href: "/blog", label: "Blog", icon: BookOpen },
];

function NavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
    >
      <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Logo height={28} />
        <nav
          className="hidden items-center gap-4 text-sm font-medium text-slate-600 md:flex xl:gap-6"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
      </div>
    </header>
  );
}
