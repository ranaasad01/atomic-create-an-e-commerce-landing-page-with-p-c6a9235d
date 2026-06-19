export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Curated for the discerning eye.";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Sale", href: "#sale" },
  { label: "About", href: "#about" },
  { label: "Newsletter", href: "#newsletter" },
];

export const navCTA = {
  label: "View Cart",
  href: "#cart-icon",
};

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  isNew?: boolean;
  isSale?: boolean;
}

export const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
] as const;

export type Category = (typeof CATEGORIES)[number];