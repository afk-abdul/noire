"use client";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Sparkles, Scan } from "lucide-react";

export default function HomePage() {
  const { products } = useStore();
  const featured = products.slice(0, 4);

  return (
    <div className="page-enter">
      {/* Global Animation Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .image-hover-zoom {
            transition: transform 0.6s ease, opacity 0.6s ease;
          }
          .image-hover-zoom:hover {
            transform: scale(1.05);
            opacity: 0.9;
          }
          .animate-reveal {
            animation: fadeInUp 1.2s ease-out forwards;
          }
        `
      }} />

      {/* Hero Section */}
      <section
        style={{
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "80px 32px",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "8%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1px solid #DDD8D0",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "5%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "1px solid #DDD8D0",
            opacity: 0.4,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "12%",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "#F0EBE4",
            opacity: 0.5,
          }}
        />

        {/* Content */}
        <div style={{ textAlign: "center", maxWidth: 700, position: "relative", zIndex: 1, animation: "fadeInUp 1s ease-out" }}>
          {/* Logo mark */}
          <div
            style={{
              width: 100,
              height: 100,
              border: "1.5px solid #888",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              margin: "0 auto 40px",
              boxShadow: "0 4px 24px rgba(28,28,28,0.06)",
              animation: "float 6s ease-in-out infinite"
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                color: "#1C1C1C",
                fontStyle: "italic",
                letterSpacing: "0.02em",
              }}
            >
              Noire
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 12,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#6B6560",
              marginBottom: 20,
            }}
          >
            2026 Collection
          </p>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(42px, 7vw, 72px)",
              fontWeight: 400,
              color: "#1C1C1C",
              lineHeight: 1.15,
              marginBottom: 24,
            }}
          >
            Elegance in
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>every shade</em>
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18,
              color: "#6B6560",
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 480,
              margin: "0 auto 40px",
            }}
          >
            Noire is a modern beauty brand created for those who believe makeup should enhance, not hide. Inspired by soft luxury and timeless elegance.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              Shop the Collection
              <ArrowRight size={15} />
            </Link>
            <Link href="/skin-analysis" className="btn-outline" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Scan size={15} />
              Skin Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Tagline bar */}
      <div
        style={{
          background: "#1C1C1C",
          padding: "18px 32px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 15,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(250,247,244,0.7)",
          }}
        >
          Free shipping on orders above Rs 15,000 &nbsp;·&nbsp; Cruelty-free &nbsp;·&nbsp; Made with love
        </p>
      </div>

      {/* About section */}
      <section style={{ padding: "100px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="responsive-grid"
        >
          {/* Image side */}
          <div style={{ position: "relative", animation: "fadeInUp 1.2s ease-out" }}>
            <div
              style={{
                height: 520,
                background: "linear-gradient(135deg, #F0EBE4 0%, #E0D9D0 50%, #DDD5C8 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}
            >
              <img 
                src="/products/makeup.png" 
                alt="Makeup products" 
                className="image-hover-zoom"
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  position: "absolute",
                  mixBlendMode: "multiply", 
                  opacity: 0.85
                }} 
              />
              <div
                style={{
                  width: 180,
                  height: 180,
                  border: "1.5px solid rgba(108,100,96,0.4)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.6)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 38,
                    fontStyle: "italic",
                    color: "#6B6560",
                  }}
                >
                  N
                </span>
              </div>
            </div>
            {/* Decorative offset box */}
            <div
              style={{
                position: "absolute",
                bottom: -20,
                right: -20,
                width: 120,
                height: 120,
                border: "1px solid #DDD8D0",
                background: "#FAF7F4",
                zIndex: -1,
              }}
            />
          </div>

          {/* Text side */}
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 12,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#6B6560",
                marginBottom: 16,
              }}
            >
              Our Story
            </p>
            <div style={{ width: 40, height: 1, background: "#1C1C1C", marginBottom: 28 }} />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 4vw, 44px)",
                fontWeight: 400,
                color: "#1C1C1C",
                lineHeight: 1.3,
                marginBottom: 24,
              }}
            >
              We believe in the power of a curated look
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17,
                color: "#6B6560",
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              Noire was born from a love of minimalist beauty. We create products that feel luxurious without excess — designed for the modern woman who values quality, intention, and effortless glamour.
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17,
                color: "#6B6560",
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              Every formula is crafted to blend seamlessly, last effortlessly, and make you feel confidently, beautifully you.
            </p>
            <Link href="/shop" className="btn-outline" style={{ display: "inline-block", transition: "transform 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Images Showcase Section */}
      <section style={{ padding: "0 32px 100px", maxWidth: 1280, margin: "0 auto" }}>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            <div className="animate-reveal" style={{ overflow: "hidden", position: "relative", height: 400, borderRadius: 2 }}>
               <img src="/products/cream-blush-set.png" alt="Cream Blush and Accessories" className="image-hover-zoom" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
               <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
                 <p style={{ fontFamily: "'Playfair Display', serif", color: "#FFF", fontSize: 24 }}>Signature Cream Blush</p>
               </div>
            </div>
            <div className="animate-reveal" style={{ overflow: "hidden", position: "relative", height: 400, borderRadius: 2, animationDelay: "0.2s" }}>
               <img src="/products/liquid-eyeliner-model.png" alt="Model applying eyeliner" className="image-hover-zoom" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
               <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
                 <p style={{ fontFamily: "'Playfair Display', serif", color: "#FFF", fontSize: 24 }}>Precision Liquid Eyeliner</p>
               </div>
            </div>
         </div>
      </section>

      {/* Featured products */}
      <section
        style={{
          padding: "60px 32px 100px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
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
            Makeup
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 400,
              color: "#1C1C1C",
              marginBottom: 12,
            }}
          >
            Our Best Products
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 16,
              color: "#6B6560",
              maxWidth: 420,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Explore our curated collection of soft luxury beauty essentials.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
            marginBottom: 48,
          }}
        >
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/shop" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            View All Products
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Skin Analysis CTA */}
      <section
        style={{
          margin: "0 32px 80px",
          background: "#1C1C1C",
          padding: "60px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 12,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(250,247,244,0.5)",
              marginBottom: 12,
            }}
          >
            New Feature
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 400,
              color: "#FAF7F4",
              lineHeight: 1.3,
              marginBottom: 14,
            }}
          >
            AI Skin Analysis
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 17,
              color: "rgba(250,247,244,0.65)",
              lineHeight: 1.7,
              maxWidth: 420,
            }}
          >
            Upload your photo and receive a personalized skin analysis — texture, tone, hydration levels, and tailored product recommendations.
          </p>
        </div>
        <Link
          href="/skin-analysis"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 32px",
            background: "#FAF7F4",
            color: "#1C1C1C",
            border: "none",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 15,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <Sparkles size={16} />
          Analyze My Skin
        </Link>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
