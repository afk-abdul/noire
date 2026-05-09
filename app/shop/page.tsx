"use client";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

const CATEGORIES = ["All", "Face", "Eyes", "Lips", "Cheeks"];

export default function ShopPage() {
  const { products } = useStore();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page-enter" style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px 100px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 12,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#6B6560",
            marginBottom: 12,
          }}
        >
          Our Collection
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 400,
            color: "#1C1C1C",
            marginBottom: 16,
          }}
        >
          Shop Now
        </h1>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 17,
            color: "#6B6560",
            maxWidth: 420,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Explore our curated collection of soft luxury beauty essentials designed to enhance your natural beauty.
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 40,
          paddingBottom: 28,
          borderBottom: "1px solid #DDD8D0",
        }}
      >
        {/* Category filters */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "8px 20px",
                background: category === cat ? "#1C1C1C" : "transparent",
                color: category === cat ? "#FAF7F4" : "#6B6560",
                border: "1px solid",
                borderColor: category === cat ? "#1C1C1C" : "#DDD8D0",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: "relative", minWidth: 220 }}>
          <Search
            size={15}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#6B6560" }}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="noire-input"
            style={{ paddingLeft: 36, paddingRight: 12, fontSize: 15 }}
          />
        </div>
      </div>

      {/* Count */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 14,
          color: "#6B6560",
          marginBottom: 28,
          letterSpacing: "0.05em",
        }}
      >
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#6B6560", fontStyle: "italic" }}>
            No products found
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#B0A89E", marginTop: 8 }}>
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}
