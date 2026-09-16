import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const productId = product._id || product.id;

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const image =
    product.image ||
    product.imageUrl ||
    "https://via.placeholder.com/600x500?text=Product";

  const rating = Number(product.rating || 4.5);

  return (
    <article className="product-card">
      <Link
        to={`/products/${productId}`}
        className="product-image-wrap"
      >
        {discount > 0 && (
          <span className="product-discount">
            -{discount}%
          </span>
        )}

        <img
          src={image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </Link>

      <div className="product-info">
        <div className="product-category">
          {product.category}
        </div>

        <Link to={`/products/${productId}`}>
          <h3 className="product-name">
            {product.name}
          </h3>
        </Link>

        <div className="product-rating">
          <span className="stars">
            {"★".repeat(Math.round(rating))}
            {"☆".repeat(5 - Math.round(rating))}
          </span>

          <span>{rating.toFixed(1)}</span>
        </div>

        <div>
          <span className="product-price">
            ${Number(product.price || 0).toFixed(2)}
          </span>

          {product.originalPrice &&
            product.originalPrice > product.price && (
              <span className="product-original-price">
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
        </div>

        <div className="product-bottom">
          <span style={{ fontSize: "12px", color: "#777" }}>
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </span>

          <button
            type="button"
            className="product-add-btn"
            disabled={product.stock <= 0}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}