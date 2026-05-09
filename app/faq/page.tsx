"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, ChevronDown } from "lucide-react";

const FAQS = [
  { q: "What makes Noire products different?", a: "Noire formulas are crafted with a 'less is more' philosophy — fewer fillers, more actives. Each product is dermatologist-reviewed for sensitive skin compatibility." },
  { q: "Are Noire products cruelty-free?", a: "Absolutely. Noire is 100% cruelty-free. We never test on animals and are working toward full vegan certification for our entire range." },
  { q: "How do I choose the right foundation shade?", a: "We recommend our AI Skin Analysis tool for personalized shade matching. You can also contact us via email and share your undertone (warm/cool/neutral) for guidance." },
  { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for unopened products. For hygiene reasons, opened cosmetics are non-returnable unless defective." },
  { q: "Do you ship internationally?", a: "Currently we ship across Pakistan. International shipping is coming soon — sign up for our newsletter to be notified." },
  { q: "How do I track my order?", a: "Once your order is dispatched, you'll receive a tracking email. Typically 3–5 business days for delivery across Pakistan." },
  { q: "Are the products suitable for sensitive skin?", a: "Yes! All Noire products are formulated without parabens, sulfates, or harsh fragrances. However, we always recommend a patch test first." },
];

const INITIAL = [
  { role: "assistant", content: "Welcome to Noire's beauty concierge. I'm here to help with product recommendations, skincare advice, order queries, or anything beauty-related. How can I assist you today?" },
];

const SUGGESTIONS = [
  "What products suit oily skin?",
  "How to apply cream blush?",
  "Best lipstick for fair skin?",
  "Skincare routine tips",
];

export default function FAQPage() {
  const [messages, setMessages] = useState(INITIAL);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const t = (text || input).trim();
    if (!t || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: t }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response || "I couldn't process that. Please try again." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 32px 100px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#6B6560", marginBottom: 12 }}>
          Help Center
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 400, color: "#1C1C1C", marginBottom: 16 }}>
          FAQ & Beauty Assistant
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#6B6560", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
          Browse our frequently asked questions or chat with our AI beauty assistant for personalized guidance.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="faq-grid">
        {/* FAQ Accordion */}
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6560", marginBottom: 24 }}>
            Frequently Asked
          </p>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #DDD8D0",
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 16,
                }}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#1C1C1C", fontWeight: 400 }}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  color="#6B6560"
                  style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                />
              </button>
              {openFaq === i && (
                <div style={{ paddingBottom: 20, animation: "slideUp 0.25s ease forwards" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#6B6560", lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chatbot */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, border: "1px solid #DDD8D0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "white" }}>
              <Sparkles size={16} strokeWidth={1.5} color="#1C1C1C" />
            </div>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6560" }}>
                AI Assistant
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#1C1C1C" }}>
                Beauty Concierge
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              minHeight: 360,
              maxHeight: 400,
              overflowY: "auto",
              background: "white",
              border: "1px solid #DDD8D0",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginBottom: 12,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className="message-enter"
                style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "10px 14px",
                    background: msg.role === "user" ? "#1C1C1C" : "#FAF7F4",
                    color: msg.role === "user" ? "#FAF7F4" : "#1C1C1C",
                    border: msg.role === "assistant" ? "1px solid #DDD8D0" : "none",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 15,
                    lineHeight: 1.6,
                    borderRadius: msg.role === "user" ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "10px 16px", background: "#FAF7F4", border: "1px solid #DDD8D0", borderRadius: "16px 16px 16px 2px", display: "flex", gap: 4 }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{ width: 6, height: 6, background: "#DDD8D0", borderRadius: "50%", display: "inline-block", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                style={{
                  padding: "6px 14px",
                  border: "1px solid #DDD8D0",
                  background: "white",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 13,
                  color: "#6B6560",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  borderRadius: 20,
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 10 }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about products, skincare, orders..."
              className="noire-input"
              style={{ flex: 1 }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 48,
                height: 48,
                background: input.trim() ? "#1C1C1C" : "#DDD8D0",
                border: "none",
                cursor: input.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s ease",
              }}
            >
              <Send size={17} color="#FAF7F4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
