"use client";

import { useState } from "react";
import Image from "next/image";
import type { FeaturedTheme } from "@/lib/constants/featured-themes";

interface ThemePreviewImageProps {
  theme: Pick<FeaturedTheme, "name" | "vendor" | "imageUrl" | "imageAlt">;
  /** card = homepage grid; detail = theme detail page */
  variant?: "card" | "detail";
  priority?: boolean;
  className?: string;
}

const variantStyles = {
  /** Portrait-ish ratio — matches tall Theme Store screenshots; cover fills card width */
  card: {
    aspect: "aspect-[4/5]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    imageClass: "object-cover object-top transition duration-500 group-hover:scale-[1.03]",
    wrapperClass: "",
  },
  /** Taller frame + contain so full Theme Store screenshot is visible */
  detail: {
    aspect: "aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]",
    sizes: "(max-width: 1024px) 100vw, 560px",
    imageClass: "object-contain object-center",
    wrapperClass: "bg-slate-100",
  },
} as const;

export function ThemePreviewImage({
  theme,
  variant = "card",
  priority = false,
  className = "",
}: ThemePreviewImageProps) {
  const [imageError, setImageError] = useState(false);
  const styles = variantStyles[variant];

  return (
    <div
      className={`relative w-full overflow-hidden bg-slate-200 ${variant === "detail" ? "rounded-2xl" : "rounded-t-2xl"} ${styles.aspect} ${styles.wrapperClass} ${className}`}
    >
      {!imageError ? (
        <Image
          src={theme.imageUrl}
          alt={theme.imageAlt}
          fill
          priority={priority}
          className={styles.imageClass}
          sizes={styles.sizes}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-light to-slate-100">
          <span className="text-2xl font-bold text-brand/40 sm:text-3xl">
            {theme.name}
          </span>
          <span className="text-xs text-slate-500">{theme.vendor}</span>
        </div>
      )}

      {/* Light top fade — suggests browser chrome without stealing image area */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-black/10 to-transparent"
        aria-hidden
      />
    </div>
  );
}
