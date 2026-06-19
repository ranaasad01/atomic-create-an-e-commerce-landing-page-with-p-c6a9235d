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
    role: "Interior Designer",
    avatar: "IM",
    text: "Lumière has completely transformed how I shop for home décor. The curation is impeccable and delivery is always flawless.",
    rating: 5,
  },
  {
    id: 2,
    name: "James Thornton",
    role: "Tech Enthusiast",
    avatar: "JT",
    text: "The Aether headphones are genuinely life-changing. Best purchase I've made this year, and the unboxing experience was premium.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sofia Reyes",
    role: "Fashion Blogger",
    avatar: "SR",
    text: "Finally a store that understands quality over quantity. Every piece I've ordered has exceeded my expectations.",
    rating: 5,
  },
];

const TRUST_FEATURES = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On all orders over $75",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    desc: "On every product we sell",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "30-day hassle-free returns",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "2–3 business days",
  },
];

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? "text-black fill-black"
              : "text-slate-200 fill-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onAddToCart,
}: {
  product: ProductItem;
  onAddToCart: (id: number) => void;
}) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x300/f1f5f9/94a3b8?text=Product";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-1 bg-black text-white text-xs font-semibold rounded-full">
              {product.badge}
            </span>
          )}
          {product.isSale && discount && (
            <span className="px-2.5 py-1 bg-black text-white text-xs font-semibold rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setWishlisted((w) => !w)}
            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:text-black transition-colors duration-200"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                wishlisted ? "fill-black text-black" : "text-slate-400"
              }`}
            />
          </motion.button>
          <Link href={`/product?id=${product.id}`}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:text-black transition-colors duration-200 cursor-pointer"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4 text-slate-400" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 mb-3 line-clamp-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-slate-500">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-lg font-bold text-slate-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            added
              ? "bg-gray-800 text-white"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (id: number) => {
    setCartCount((c) => c + 1);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-full" style={{ color: "#ed2626", backgroundColor: "#000000" }}>
                <Sparkles className="w-4 h-4" />
                New Season Collection
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight"
            >
              Discover Products
              <br />
              <span className="text-black">Worth Loving</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              {APP_TAGLINE} Explore our hand-picked selection of premium goods
              crafted for those who appreciate quality.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-2xl hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#sale"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-2xl border-2 border-slate-200 hover:border-black transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#sale")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Sale
                <ChevronRight className="w-5 h-5" />
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-12 pt-8"
            >
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "500+", label: "Premium Products" },
                { value: "4.9★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── Trust Features ── */}
      <section className="bg-white border-y border-slate-100">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_FEATURES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
              >
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-semibold text-black uppercase tracking-widest mb-3"
            >
              Our Collection
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
            >
              Featured Products
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-500 max-w-xl mx-auto"
            >
              Handpicked for quality, style, and value. Every item tells a story.
            </motion.p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No products in this category yet.</p>
            </div>
          )}

          {/* View All */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-black text-black font-semibold rounded-2xl hover:bg-black hover:text-white transition-all duration-200"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Promotional Banner ── */}
      <section id="sale" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-full">
                <Zap className="w-4 h-4" />
                Limited Time Offer
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Season Sale
                <br />
                <span className="text-gray-300">Up to 30% Off</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Don't miss out on our biggest sale of the season. Premium
                products at unbeatable prices — for a limited time only.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-100 transition-colors duration-200"
                >
                  Shop the Sale
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Right — Sale product cards */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-4"
            >
              {SALE_PRODUCTS.slice(0, 4).map((product) => {
                const discount = product.originalPrice
                  ? Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )
                  : null;
                return (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/200x200/1e293b/94a3b8?text=Sale";
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-white text-xs font-semibold truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white font-bold text-sm">
                          ${product.price}
                        </span>
                        {discount && (
                          <span className="text-xs bg-white text-black px-1.5 py-0.5 rounded-full font-semibold">
                            -{discount}%
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-semibold text-black uppercase tracking-widest mb-3"
            >
              Testimonials
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-slate-900"
            >
              What Our Customers Say
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-black fill-black"
                    />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="newsletter" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
                <Mail className="w-4 h-4" />
                Stay in the Loop
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Get Exclusive Offers
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-300 mb-10 text-lg"
            >
              Subscribe to our newsletter and be the first to know about new
              arrivals, sales, and style tips.
            </motion.p>

            {subscribed ? (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-center gap-3 text-white"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-lg">You're subscribed!</p>
                  <p className="text-gray-300 text-sm">
                    Welcome to the Lumière family.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </motion.form>
            )}

            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-xs mt-4"
            >
              No spam, ever. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
