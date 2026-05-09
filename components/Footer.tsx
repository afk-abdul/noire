import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/skin-analysis", label: "Skin Analysis" },
    { href: "/faq", label: "FAQ" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <footer
      style={{
        background: "#1C1C1C",
        color: "#FAF7F4",
        padding: "60px 32px 40px",
        marginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                width: 56,
                height: 56,
                border: "1.5px solid rgba(250,247,244,0.4)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 13,
                  color: "#FAF7F4",
                  letterSpacing: "0.02em",
                }}
              >
                Noire
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 15,
                color: "rgba(250,247,244,0.6)",
                lineHeight: 1.7,
                maxWidth: 220,
              }}
            >
              Empowering your natural beauty with soft luxury and timeless elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(250,247,244,0.5)",
                marginBottom: 20,
              }}
            >
              Quick Shop
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 16,
                    color: "rgba(250,247,244,0.8)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(250,247,244,0.5)",
                marginBottom: 20,
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a
                href="mailto:noirebeauty@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "rgba(250,247,244,0.8)",
                  textDecoration: "none",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 15,
                }}
              >
                <Mail size={16} strokeWidth={1.5} />
                noirebeauty@gmail.com
              </a>
              <a
                href="https://www.instagram.com/noirebbeauty"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "rgba(250,247,244,0.8)",
                  textDecoration: "none",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 15,
                }}
              >
                <Instagram size={16} strokeWidth={1.5} />
                @noirebbeauty
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid rgba(250,247,244,0.1)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              color: "rgba(250,247,244,0.4)",
              letterSpacing: "0.05em",
            }}
          >
            © 2026 Noire. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 12,
              fontStyle: "italic",
              color: "rgba(250,247,244,0.3)",
            }}
          >
            Elegance in every shade
          </p>
        </div>
      </div>
    </footer>
  );
}
