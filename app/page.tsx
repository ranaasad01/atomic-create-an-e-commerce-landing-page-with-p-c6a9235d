"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ShoppingCart, Star, ArrowRight, Check, Truck, Shield, RefreshCw, Sparkles, Heart, Eye, ChevronRight, Mail, Zap } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, CATEGORIES, type Category } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

interface ProductItem {
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
  description: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 1,
    name: "Aether Wireless Headphones",
    category: "Electronics",
    price: 249,
    originalPrice: 349,
    rating: 4.9,
    reviewCount: 1284,
    image: "https://kiwiears.com/cdn/shop/files/IMG_8002.jpg?v=1750832155&width=1946",
    badge: "Best Seller",
    isSale: true,
    description: "Studio-grade sound with 40-hour battery life.",
  },
  {
    id: 2,
    name: "Silk Cashmere Wrap",
    category: "Fashion",
    price: 189,
    rating: 4.8,
    reviewCount: 632,
    image: "https://maisoncashmere.com/cdn/shop/files/wrap-cashmere-silk-positano-883_60-28-1_ce005d6a-00f9-4849-844a-480369dd8f99.webp?v=1776182098&width=1024",
    badge: "New",
    isNew: true,
    description: "Ethically sourced, impossibly soft.",
  },
  {
    id: 3,
    name: "Marble & Walnut Desk Lamp",
    category: "Home & Living",
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    reviewCount: 418,
    image: "https://www.worldmarket.com/dw/image/v2/BJWT_PRD/on/demandware.static/-/Sites-wm-master-catalog/default/dw153bdaf3/images/large/116825_XXX_v1.jpg?sw=768&sh=768&sm=fit&sfrm=jpg&q=80",
    isSale: true,
    description: "Warm-tone LED with touch dimmer.",
  },
  {
    id: 4,
    name: "Lumière Glow Serum",
    category: "Beauty",
    price: 89,
    rating: 4.9,
    reviewCount: 2107,
    image: "https://lavernecosmetics.com/cdn/shop/files/Lumiere_3_HA_AHA_Glowing_Lifting_Serum.jpg?v=1766081390",
    badge: "Fan Fave",
    description: "Vitamin C + hyaluronic acid radiance boost.",
  },
  {
    id: 5,
    name: "Carbon Fibre Water Bottle",
    category: "Sports",
    price: 64,
    originalPrice: 79,
    rating: 4.6,
    reviewCount: 893,
    image: "https://m.media-amazon.com/images/I/71szy16-1gL._AC_UF894,1000_QL80_.jpg",
    isSale: true,
    description: "Keeps cold 24 h, hot 12 h. 750 ml.",
  },
  {
    id: 6,
    name: "Obsidian Smart Watch",
    category: "Electronics",
    price: 399,
    rating: 4.8,
    reviewCount: 756,
    image: "https://i5.walmartimages.com/seo/Pixel-Watch-4-45mm-LTE-Black-Obsidian_41b8524c-e8d5-4378-83cf-a1deee21b6b0.8970d7317d95017f3c37111af7197ed5.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    badge: "New",
    isNew: true,
    description: "Health tracking meets Swiss-inspired design.",
  },
  {
    id: 7,
    name: "Linen Tailored Blazer",
    category: "Fashion",
    price: 275,
    originalPrice: 320,
    rating: 4.7,
    reviewCount: 341,
    image: "http://modatrova.com/cdn/shop/files/serenity-be-blazer-julie-linen-tailored-blazer-with-flower-detail-40260026532070.jpg?v=1716469526",
    isSale: true,
    description: "Relaxed structure for effortless polish.",
  },
  {
    id: 8,
    name: "Ceramic Pour-Over Set",
    category: "Home & Living",
    price: 98,
    rating: 4.9,
    reviewCount: 1023,
    image: "https://freefoldingceramic.com/cdn/shop/products/freefolding-570copy_800x.jpg?v=1638619175",
    badge: "Best Seller",
    description: "Handcrafted stoneware for the ritual of coffee.",
  },
];

const SALE_PRODUCTS = PRODUCTS.filter((p) => p.isSale);

const TESTIMONIALS = [
  {
    id: 1,
    name: "Isabelle Moreau",
    role: "Interior Designer, Paris",
    avatar: "https://static.wikia.nocookie.net/desperados/images/a/a7/Hud_portrait_isabelle.png/revision/latest?cb=20201109223554",
    rating: 5,
    text: "Lumière has completely changed how I shop. Every piece I've ordered has exceeded my expectations — the curation is genuinely exceptional.",
  },
  {
    id: 2,
    name: "James Whitfield",
    role: "Creative Director, London",
    avatar: "https://www.nga.org/wp-content/uploads/2018/12/James_whitfield_Gov.jpg",
    rating: 5,
    text: "The quality-to-price ratio is unmatched. I've gifted Lumière products to clients and they always ask where I found them.",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    role: "Architect, Tokyo",
    avatar: "https://cdn-test.poetryfoundation.org/cdn-cgi/image/w=2292,h=3438,q=80/content/images/Yuki-Tanaka-c-Ippei-and-Janine-Photography.jpg",
    rating: 5,
    text: "Fast shipping, beautiful packaging, and products that look even better in person. Lumière is my go-to for anything special.",
  },
];

const VALUE_PROPS = [
  {
    icon: Truck,
    title: "Free Global Shipping",
    description: "Complimentary delivery on all orders over $75, worldwide.",
  },
  {
    icon: Shield,
    title: "2-Year Guarantee",
    description: "Every product is backed by our quality promise.",
  },
  {
    icon: RefreshCw,
    title: "60-Day Returns",
    description: "Not in love? Return it, no questions asked.",
  },
  {
    icon: Zap,
    title: "Express Delivery",
    description: "Next-day delivery available in 30+ countries.",
  },
];

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)} ({count.toLocaleString()})
      </span>
    </div>
  );
}

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 4px 24px 0 rgba(109,40,217,0.06)" },
  hover: { y: -6, boxShadow: "0 16px 40px 0 rgba(109,40,217,0.14)" },
};

const imageHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
};

const overlayHover: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

function ProductCard({ product }: { product: ProductItem }) {
  const [wished, setWished] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover={prefersReduced ? undefined : "hover"}
      animate="rest"
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 cursor-pointer group"
      style={{ willChange: "transform" }}
    >
      <motion.div variants={cardHover} className="h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
          <motion.img
            variants={imageHover}
            transition={{ duration: 0.45, ease: "easeOut" }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <motion.div
            variants={overlayHover}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-slate-900/30 flex items-center justify-center gap-3"
          >
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-violet-600 hover:text-white transition-colors duration-200"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-violet-600 hover:text-white transition-colors duration-200"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </motion.button>
          </motion.div>
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="bg-violet-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            {product.isSale && (
              <span className="bg-rose-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Sale
              </span>
            )}
          </div>
          {/* Wishlist */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setWished((w) => !w)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow transition-colors duration-200"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                wished ? "fill-rose-500 text-rose-500" : "text-slate-400"
              }`}
            />
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <span className="text-xs font-medium text-violet-600 uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="text-sm font-semibold text-slate-900 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {product.description}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center gap-2 mt-auto pt-1">
            <span className="text-base font-bold text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs font-semibold text-rose-500 ml-auto">
                Save ${product.originalPrice - product.price}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const prefersReduced = useReducedMotion();

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] bg-violet-800/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={prefersReduced ? fadeIn : slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 text-violet-300 text-sm font-medium px-4 py-2 rounded-full w-fit"
            >
              <Sparkles className="w-4 h-4" />
              {APP_TAGLINE}
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight"
            >
              Discover
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-violet-200 bg-clip-text text-transparent">
                Extraordinary
              </span>
              <br />
              Products
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-slate-300 text-lg leading-relaxed max-w-md"
            >
              {APP_NAME} brings together the world's finest goods — from
              precision electronics to artisan home objects — curated for those
              who refuse to settle.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.a
                href="#products"
                whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-violet-900/40 transition-colors duration-200"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#sale"
                whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#sale")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 border border-slate-600 hover:border-violet-500 text-slate-300 hover:text-violet-300 font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200"
              >
                View Sale
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-5 pt-2"
            >
              {["50k+ Happy Customers", "Free Returns", "Secure Checkout"].map(
                (badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-1.5 text-slate-400 text-sm"
                  >
                    <Check className="w-4 h-4 text-violet-400" />
                    {badge}
                  </div>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Right — hero product mosaic */}
          <motion.div
            variants={prefersReduced ? fadeIn : slideInRight}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {PRODUCTS.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.55,
                  ease: "easeOut",
                }}
                className={`relative rounded-2xl overflow-hidden bg-slate-800 ${
                  i === 0 ? "row-span-2" : ""
                }`}
                style={{ aspectRatio: i === 0 ? "3/4" : "4/3" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs font-semibold truncate">
                    {product.name}
                  </p>
                  <p className="text-violet-300 text-xs font-bold">
                    ${product.price}
                  </p>
                </div>
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="flex flex-col items-center text-center gap-3 group"
            >
              <motion.div
                whileHover={prefersReduced ? undefined : { scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.25 }}
                className="w-12 h-12 bg-violet-50 group-hover:bg-violet-100 rounded-xl flex items-center justify-center transition-colors duration-200"
              >
                <Icon className="w-5 h-5 text-violet-600" />
              </motion.div>
              <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section id="products" className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest mb-2">
                Our Collection
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Featured Products
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              Handpicked by our team of taste-makers. Updated weekly.
            </p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                variants={fadeIn}
                whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                whileTap={prefersReduced ? undefined : { scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-center text-slate-400 py-16"
            >
              No products in this category yet.
            </motion.p>
          )}
        </div>
      </section>

      {/* ── SALE BANNER ──────────────────────────────────────────────────── */}
      <section id="sale" className="bg-gradient-to-r from-violet-700 to-violet-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Limited Time
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Up to 30% Off — This Week Only
            </h2>
            <p className="text-violet-200 text-base max-w-md mx-auto">
              Our biggest sale of the season. Premium products at prices that
              won't last.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SALE_PRODUCTS.map((product) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={prefersReduced ? undefined : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden flex gap-4 p-4 items-center"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-violet-200 text-xs mb-1.5">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-violet-300 text-sm line-through">
                          ${product.originalPrice}
                        </span>
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <motion.button
                  whileHover={prefersReduced ? undefined : { scale: 1.08 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.94 }}
                  className="flex-shrink-0 w-9 h-9 bg-white rounded-full flex items-center justify-center text-violet-700 hover:bg-violet-50 transition-colors duration-200 shadow"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingCart className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / BRAND STORY ──────────────────────────────────────────── */}
      <section id="about" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image mosaic */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-slate-100">
              <img
                src="https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_3840/kxljjdyobztzlciuimev"
                alt="Lumière studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 pt-8">
              <div className="rounded-2xl overflow-hidden aspect-square bg-slate-100">
                <img
                  src="https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_3840/kxljjdyobztzlciuimev"
                  alt="Artisan craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square bg-slate-100">
                <img
                  src="http://www.locallyhandmadene.com/cdn/shop/articles/handmade.png?v=1748519197"
                  alt="Curated packaging"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest">
              Our Story
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Built on the belief that
              <span className="text-violet-600"> beauty matters.</span>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {APP_NAME} was founded in 2019 by a team of designers, travellers,
              and obsessive product-hunters who were tired of settling. We scour
              the globe — from Kyoto workshops to Copenhagen studios — to bring
              you objects that are as functional as they are beautiful.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Every product in our catalogue passes a rigorous 12-point quality
              review. We partner only with makers who share our commitment to
              ethical production, sustainable materials, and lasting design.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              {[
                { value: "50k+", label: "Customers" },
                { value: "200+", label: "Brands" },
                { value: "98%", label: "Satisfaction" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-violet-600">
                    {value}
                  </span>
                  <span className="text-sm text-slate-500">{label}</span>
                </div>
              ))}
            </div>

            <motion.a
              href="#products"
              whileHover={prefersReduced ? undefined : { scale: 1.03 }}
              whileTap={prefersReduced ? undefined : { scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl w-fit transition-colors duration-200 shadow-md shadow-violet-200"
            >
              Explore the Collection
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest mb-2">
              Social Proof
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Loved by discerning shoppers
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={prefersReduced ? undefined : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-gradient-to-br from-violet-700 to-violet-900 rounded-3xl px-8 py-16 sm:px-16 text-center relative overflow-hidden"
          >
            {/* Decorative orbs */}
            <div className="absolute top-[-30%] right-[-10%] w-80 h-80 bg-violet-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-30%] left-[-10%] w-80 h-80 bg-violet-800/30 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative">
              <motion.div
                variants={fadeInUp}
                className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <Mail className="w-7 h-7 text-white" />
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-bold text-white mb-3"
              >
                Join the Inner Circle
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-violet-200 text-base max-w-md mx-auto mb-8"
              >
                Get early access to new arrivals, exclusive member discounts,
                and curated style guides — delivered to your inbox.
              </motion.p>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-xl"
                >
                  <Check className="w-5 h-5 text-green-300" />
                  You're on the list — welcome!
                </motion.div>
              ) : (
                <motion.form
                  variants={fadeInUp}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-violet-300 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                  />
                  <motion.button
                    whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                    whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                    type="submit"
                    className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-violet-50 transition-colors duration-200 shadow-lg whitespace-nowrap"
                  >
                    Subscribe Free
                  </motion.button>
                </motion.form>
              )}

              <motion.p
                variants={fadeInUp}
                className="text-violet-300 text-xs mt-4"
              >
                No spam, ever. Unsubscribe in one click.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}