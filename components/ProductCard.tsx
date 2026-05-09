"use client";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import type { Product } from "@/context/StoreContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (product.stock <= 0) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="product-card"
      style={{
        background: "white",
        border: "1px solid #DDD8D0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div
        style={{
          height: 240,
          background: "linear-gradient(135deg, #F0EBE4 0%, #E8E1D8 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 40,
                color: "#DDD8D0",
                display: "block",
                lineHeight: 1,
              }}
            >
              {product.name.charAt(0)}
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 11,
                color: "#B0A89E",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: 8,
                display: "block",
              }}
            >
              {product.category}
            </span>
          </div>
        )}
        {product.stock <= 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(250,247,244,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#6B6560",
              }}
            >
              Out of Stock
            </span>
          </div>
        )}
        {product.stock > 0 && product.stock <= 3 && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "#1C1C1C",
              color: "#FAF7F4",
              padding: "3px 10px",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11,
              letterSpacing: "0.1em",
            }}
          >
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6B6560",
              marginBottom: 6,
            }}
          >
            {product.category}
          </p>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 17,
              fontWeight: 400,
              color: "#1C1C1C",
              marginBottom: 6,
            }}
          >
            {product.name}
          </h3>
          {product.description && (
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 14,
                color: "#6B6560",
                lineHeight: 1.5,
                marginBottom: 12,
              }}
            >
              {product.description}
            </p>
          )}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 16,
              color: "#1C1C1C",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            Rs {product.price?.toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleAdd}
          disabled={product.stock <= 0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "11px 20px",
            background: added ? "#F0EBE4" : product.stock <= 0 ? "#F0EBE4" : "#1C1C1C",
            color: added ? "#1C1C1C" : product.stock <= 0 ? "#B0A89E" : "#FAF7F4",
            border: "1px solid",
            borderColor: added ? "#DDD8D0" : product.stock <= 0 ? "#DDD8D0" : "#1C1C1C",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: product.stock <= 0 ? "not-allowed" : "pointer",
            transition: "all 0.25s ease",
            width: "100%",
          }}
        >
          <ShoppingBag size={14} strokeWidth={1.5} />
          {added ? "Added to Bag" : product.stock <= 0 ? "Out of Stock" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}
