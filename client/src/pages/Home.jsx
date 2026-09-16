import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
} from "lucide-react";

import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products");

        const data = response?.data;

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data?.products)) {
          setProducts(data.products);
        } else if (Array.isArray(data?.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const featuredProducts =
    products.filter((product) => product.featured).length > 0
      ? products.filter((product) => product.featured).slice(0, 8)
      : products.slice(0, 8);

  const heroProduct =
    products.find((product) => product.featured) ||
    products[0];

  const categories = [
    {
      name: "Electronics",
      description: "Smart tech & gadgets",
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Fashion",
      description: "Everyday essentials",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Home",
      description: "Make it feel like home",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Accessories",
      description: "Small things, big style",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Lifestyle",
      description: "For your everyday life",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div>
          <span className="eyebrow">
            NEXLEVR • LEVEL 02 E-COMMERCE
          </span>

          <h1>
            Shop smarter.
            <br />
            Live better.
          </h1>

          <p>
            Discover quality products across electronics,
            fashion, home, accessories and lifestyle — all
            in one simple shopping experience.
          </p>

          <Link to="/products" className="cta">
            Shop Now
            <ArrowRight size={17} />
          </Link>

          <div
            style={{
              display: "flex",
              gap: "28px",
              marginTop: "35px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong style={{ fontSize: "25px" }}>
                30+
              </strong>
              <div style={{ color: "#777", fontSize: "13px" }}>
                Products
              </div>
            </div>

            <div>
              <strong style={{ fontSize: "25px" }}>
                5
              </strong>
              <div style={{ color: "#777", fontSize: "13px" }}>
                Categories
              </div>
            </div>

            <div>
              <strong style={{ fontSize: "25px" }}>
                24/7
              </strong>
              <div style={{ color: "#777", fontSize: "13px" }}>
                Shopping
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            minWidth: 0,
          }}
        >
          {heroProduct ? (
            <div
              style={{
                background: "#fff",
                borderRadius: "28px",
                overflow: "hidden",
                border: "1px solid #e7e4dc",
                boxShadow:
                  "0 25px 70px rgba(0,0,0,0.10)",
              }}
            >
              <img
                src={
                  heroProduct.image ||
                  "https://via.placeholder.com/800x700?text=Nexlevr"
                }
                alt={heroProduct.name}
                style={{
                  width: "100%",
                  height: "500px",
                  display: "block",
                  objectFit: "contain",
                  padding: "35px",
                  background: "#f5f2e9",
                }}
              />

              <div style={{ padding: "22px 25px" }}>
                <small
                  style={{
                    color: "#777",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: 700,
                  }}
                >
                  Featured Product
                </small>

                <h3
                  style={{
                    margin: "6px 0",
                    fontSize: "22px",
                  }}
                >
                  {heroProduct.name}
                </h3>

                <strong style={{ fontSize: "20px" }}>
                  ${Number(heroProduct.price).toFixed(2)}
                </strong>
              </div>
            </div>
          ) : (
            <div className="heroCard">
              <Sparkles size={40} />
              <b>30+</b>
              <span>Curated products</span>

              <b>5</b>
              <span>Shopping categories</span>

              <b>24/7</b>
              <span>Online shopping</span>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="category-section">
        <div className="home-container">
          <span className="eyebrow">
            SHOP BY CATEGORY
          </span>

          <h2 className="section-title">
            Find what you need.
          </h2>

          <p className="section-subtitle">
            Browse our collection by category and discover
            products selected for everyday use.
          </p>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(
                  category.name
                )}`}
                className="category-card"
                style={{
                  backgroundImage: `linear-gradient(
                    to top,
                    rgba(0,0,0,0.72),
                    rgba(0,0,0,0.05)
                  ), url("${category.image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "#fff",
                }}
              >
                <div>
                  <h3>{category.name}</h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-section">
        <div className="home-container">
          <div className="sectionHead">
            <div>
              <span className="eyebrow">
                FEATURED COLLECTION
              </span>

              <h2 className="section-title">
                Popular right now.
              </h2>

              <p className="section-subtitle">
                Explore products from our latest collection.
              </p>
            </div>

            <Link to="/products" className="cta">
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="loader">
              Loading products...
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="panel">
              No products found. Make sure the backend and
              MongoDB are running.
            </div>
          ) : (
            <div className="featured-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits-section">
        <div className="home-container">
          <span className="eyebrow">
            WHY SHOP WITH US
          </span>

          <h2 className="section-title">
            Simple. Secure. Convenient.
          </h2>

          <div className="benefits-grid">
            <div className="benefit-card">
              <Truck size={28} />
              <h3>Easy Shopping</h3>
              <p>
                Browse products, add items to your cart and
                complete checkout with a simple experience.
              </p>
            </div>

            <div className="benefit-card">
              <ShieldCheck size={28} />
              <h3>Secure Accounts</h3>
              <p>
                JWT authentication and protected user
                accounts keep your shopping experience secure.
              </p>
            </div>

            <div className="benefit-card">
              <Headphones size={28} />
              <h3>Everything in One Place</h3>
              <p>
                Manage your cart, orders, profile and shopping
                activity from one platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="home-container">
          <div className="cta-box">
            <div>
              <span className="eyebrow" style={{ color: "#aaa" }}>
                READY TO SHOP?
              </span>

              <h2 style={{ margin: "8px 0 0" }}>
                Find something you'll love.
              </h2>

              <p>
                Explore the complete Nexlevr collection.
              </p>
            </div>

            <Link to="/products" className="cta">
              Explore Products
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}