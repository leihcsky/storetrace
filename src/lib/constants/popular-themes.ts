import {
  featuredThemes,
  getFeaturedThemeBySlug,
  type FeaturedTheme,
  type ThemePriceType,
} from "@/lib/constants/featured-themes";

const img = (id: string) =>
  `https://cdn.shopify.com/theme-store/${id}.jpg?width=1200&quality=80`;

interface PopularThemeEntry {
  name: string;
  slug: string;
  vendor: string;
  description: string;
  priceType: ThemePriceType;
  priceLabel: string;
  imageId: string;
}

/** Popular themes with Theme Store preview images (no database). */
const popularThemeEntries: PopularThemeEntry[] = [
  {
    name: "Expanse",
    slug: "expanse",
    vendor: "Archetype Themes",
    description: "Flexible premium theme for large catalogs and growing brands.",
    priceType: "premium",
    priceLabel: "Premium",
    imageId: "egj2zmquo4pv6df6zgw2ytyrqwt8",
  },
  {
    name: "Symmetry",
    slug: "symmetry",
    vendor: "Clean Canvas",
    description: "Clean layouts for fashion and home brands with strong collections.",
    priceType: "premium",
    priceLabel: "Premium",
    imageId: "cgdg734a18xklqj7hee9zozvj1v5",
  },
  {
    name: "Warehouse",
    slug: "warehouse",
    vendor: "Maestrooo",
    description: "Industrial look for home, hardware, and lifestyle stores.",
    priceType: "premium",
    priceLabel: "Premium",
    imageId: "3ptcwe878ov4bm9b2s0e237kz0bw",
  },
  {
    name: "Empire",
    slug: "empire",
    vendor: "Pixel Union",
    description: "Built for big catalogs with filtering and merchandising tools.",
    priceType: "premium",
    priceLabel: "Premium",
    imageId: "k9mc4asxxht2h48e9j3px6xm6ubv",
  },
  {
    name: "Streamline",
    slug: "streamline",
    vendor: "Archetype Themes",
    description: "Fast, modern premium theme for high-traffic Shopify stores.",
    priceType: "premium",
    priceLabel: "Premium",
    imageId: "mz40lf11digwzwzbyupg1t2iy7pi",
  },
  {
    name: "Reformation",
    slug: "reformation",
    vendor: "Fuel Themes",
    description: "Bold typography and layouts for modern DTC brands.",
    priceType: "premium",
    priceLabel: "Premium",
    imageId: "5wplajbmnx3afv26p1jftrifwicb",
  },
  {
    name: "Broadcast",
    slug: "broadcast",
    vendor: "Invisible",
    description: "Editorial storytelling for content-led ecommerce brands.",
    priceType: "premium",
    priceLabel: "Premium",
    imageId: "hlwkwy31pwoflm9aon2dfycnl4fk",
  },
  {
    name: "Focal",
    slug: "focal",
    vendor: "Maestrooo",
    description: "Image-first premium theme for beauty and fashion lookbooks.",
    priceType: "premium",
    priceLabel: "Premium",
    imageId: "jhwiunzhhrbn8zxexkdopn23hzj6",
  },
  {
    name: "Pipeline",
    slug: "pipeline",
    vendor: "Groupthought",
    description: "Hero product storytelling for single-SKU and launch brands.",
    priceType: "premium",
    priceLabel: "Premium",
    imageId: "t3f6rrrh72mtizvshj3e0w4g3nsb",
  },
  {
    name: "Be Yours",
    slug: "be-yours",
    vendor: "RoarTheme",
    description: "Romantic, gift-friendly layouts for seasonal campaigns.",
    priceType: "premium",
    priceLabel: "Premium",
    imageId: "3bvfa9kg45hgi3f6lurjfizg59m0",
  },
  {
    name: "Showcase",
    slug: "showcase",
    vendor: "Shopify",
    description: "Product grid free theme with large image tiles.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "90non9mlf6xhnd03sqn92yyoavgn",
  },
  {
    name: "Sense",
    slug: "sense",
    vendor: "Shopify",
    description: "Wellness and self-care styling with soft, calm palettes.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "1nfncjq8hd71pb2cppnoc1xybora",
  },
  {
    name: "Colorblock",
    slug: "colorblock",
    vendor: "Shopify",
    description: "Playful free theme with bold color blocks and promos.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "c98hkhgl7f3m3eevtpxifuiv3g7v",
  },
  {
    name: "Spotlight",
    slug: "spotlight",
    vendor: "Shopify",
    description: "Single-product and launch-focused free Shopify theme.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "j3ukdxbkombyov8hsix7zykchdng",
  },
  {
    name: "Trade",
    slug: "trade",
    vendor: "Shopify",
    description: "B2B-friendly free theme with quick order list layouts.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "yne7ymtx6s615ljwtqowsgzkepaw",
  },
  {
    name: "Craft",
    slug: "craft",
    vendor: "Shopify",
    description: "Artisan and handmade brand styling with warm typography.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "eo698hse0hsbklim8yymti0aaazo",
  },
  {
    name: "District",
    slug: "district",
    vendor: "Shopify",
    description: "Streetwear grids and bold collection pages.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "0lxw00szzxq9c2yvy3pk16baqhf0",
  },
  {
    name: "Studio",
    slug: "studio",
    vendor: "Shopify",
    description: "Art and print-on-demand friendly layouts.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "kx7zl3symb4uzaisyt3zu5sd4o4p",
  },
  {
    name: "Ride",
    slug: "ride",
    vendor: "Shopify",
    description: "Sports and outdoor brands with action-focused imagery.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "dknqi8dzux4k0lw3rfjxnpytllfs",
  },
  {
    name: "Taste",
    slug: "taste",
    vendor: "Shopify",
    description: "Food and beverage layouts with menu-style sections.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "c7udlk4fspa23mm96sd38vmr2qfh",
  },
  {
    name: "Origin",
    slug: "origin",
    vendor: "Shopify",
    description: "Sustainable and organic brand storytelling on a free base.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "8xujm6iwh4gzmbkvnh7vb87ne2kg",
  },
  {
    name: "Publisher",
    slug: "publisher",
    vendor: "Shopify",
    description: "Blog-forward free theme for content-led stores.",
    priceType: "free",
    priceLabel: "Free",
    imageId: "cw0w0fd7ncbvecweubjffrgiv01h",
  },
];

function entryToFeaturedTheme(entry: PopularThemeEntry): FeaturedTheme {
  const themeStoreUrl = `https://themes.shopify.com/themes/${entry.slug}`;
  return {
    name: entry.name,
    slug: entry.slug,
    vendor: entry.vendor,
    description: entry.description,
    metaDescription: entry.description,
    priceType: entry.priceType,
    priceLabel: entry.priceLabel,
    priceDisplay: entry.priceLabel,
    features: [],
    overview: [entry.description],
    exampleStoresToScan: [],
    themeStoreUrl,
    imageUrl: img(entry.imageId),
    imageAlt: `${entry.name} Shopify theme preview`,
  };
}

const extraPopular = popularThemeEntries.map(entryToFeaturedTheme);

const bySlug = new Map<string, FeaturedTheme>();
for (const theme of [...featuredThemes, ...extraPopular]) {
  bySlug.set(theme.slug, theme);
}

/** All popular themes for listing (featured entries win on duplicate slug). */
export const popularThemes: FeaturedTheme[] = [...bySlug.values()];

export function getPopularThemeBySlug(slug: string): FeaturedTheme | undefined {
  return getFeaturedThemeBySlug(slug) ?? bySlug.get(slug);
}
