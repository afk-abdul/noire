"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Navbar() {
  const { cartCount, setCartOpen } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/skin-analysis", label: "Skin Analysis" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(250,247,244,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #DDD8D0",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  border: "1.5px solid #888",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 13,
                    color: "#1C1C1C",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  Noire
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: 36 }} className="hidden-mobile">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 15,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: pathname === href ? "#1C1C1C" : "#6B6560",
                  borderBottom: pathname === href ? "1px solid #1C1C1C" : "1px solid transparent",
                  paddingBottom: 2,
                  transition: "all 0.2s ease",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link
              href="/admin"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6B6560",
                textDecoration: "none",
              }}
              className="hidden-mobile"
            >
              Admin
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
                padding: 4,
                color: "#1C1C1C",
              }}
              aria-label="Open cart"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -4,
                    width: 18,
                    height: 18,
                    background: "#1C1C1C",
                    color: "#FAF7F4",
                    borderRadius: "50%",
                    fontSize: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#1C1C1C" }}
              className="mobile-only"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            background: "#FAF7F4",
            borderBottom: "1px solid #DDD8D0",
            zIndex: 999,
            padding: "20px 32px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18,
                color: "#1C1C1C",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15,
              color: "#6B6560",
              textDecoration: "none",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Admin
          </Link>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: 72 }} />

      <style jsx global>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
