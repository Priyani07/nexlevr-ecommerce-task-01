import React, { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [sort, setSort] = useState("default");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

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
        console.error("Products error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const searchText = search.trim().toLowerCase();

    if (searchText) {
      result = result.filter((product) => {
        return (
          product.name?.toLowerCase().includes(searchText) ||
          product.description
            ?.toLowerCase()
            .includes(searchText) ||
          product.category
            ?.toLowerCase()
            .includes(searchText)
        );
      });
    }

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return result;
  }, [products, search, category, sort]);

  const updateCategory = (value) => {
    setCategory(value);

    const next = new URLSearchParams(searchParams);

    if (value === "All") {
      next.delete("category");
    } else {
      next.set("category", value);
    }

    setSearchParams(next);
  };

  const updateSearch = (value) => {
    setSearch(value);

    const next = new URLSearchParams(searchParams);

    if (value.trim()) {
      next.set("search", value);
    } else {
      next.delete("search");
    }

    setSearchParams(next);
  };

  return (
    <main className="page">
      <div className="home-container">
        {/* HEADER */}
        <div className="sectionHead">
          <div>
            <span className="eyebrow">
              NEXLEVR SHOP
            </span>

            <h2>Shop all products.</h2>

            <p className="section-subtitle">
              Discover electronics, fashion, home,
              accessories and lifestyle products.
            </p>
          </div>

          <div
            style={{
              minWidth: "280px",
              maxWidth: "420px",
            }}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#777",
                }}
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  updateSearch(e.target.value)
                }
                placeholder="Search products..."
                style={{
                  paddingLeft: "45px",
                }}
              />
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "30px",
            padding: "15px",
            background: "#fff",
            border: "1px solid #e7e4dc",
            borderRadius: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <SlidersHorizontal size={17} />

            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => updateCategory(item)}
                style={{
                  padding: "9px 14px",
                  background:
                    category === item
                      ? "#171717"
                      : "#f3f1eb",
                  color:
                    category === item
                      ? "#fff"
                      : "#171717",
                  borderRadius: "999px",
                  fontSize: "12px",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              padding: "10px 14px",
              border: "1px solid #d8d5cc",
              borderRadius: "10px",
              background: "#fff",
            }}
          >
            <option value="default">
              Sort: Default
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="rating">
              Highest Rated
            </option>
          </select>
        </div>

        {/* RESULTS */}
        <div
          style={{
            marginBottom: "18px",
            color: "#777",
            fontSize: "13px",
          }}
        >
          Showing{" "}
          <strong style={{ color: "#171717" }}>
            {filteredProducts.length}
          </strong>{" "}
          products
        </div>

        {loading ? (
          <div className="loader">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div
            className="panel"
            style={{
              textAlign: "center",
              padding: "70px 20px",
            }}
          >
            <h3>No products found</h3>

            <p style={{ color: "#777" }}>
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}