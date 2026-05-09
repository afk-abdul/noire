"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content: "Hello! I'm Noire's beauty assistant. Ask me anything about our products, ingredients, skincare tips, or orders. ✨",
  },
];

export default function FAQChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || "I'm sorry, I couldn't process that. Please try again." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "#1C1C1C",
          color: "#FAF7F4",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(28,28,28,0.25)",
          zIndex: 900,
          transition: "transform 0.2s ease",
        }}
        aria-label="Open chatbot"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} strokeWidth={1.5} />}
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 92,
            right: 28,
            width: "min(380px, calc(100vw - 56px))",
            height: 480,
            background: "#FAF7F4",
            border: "1px solid #DDD8D0",
            boxShadow: "0 12px 48px rgba(28,28,28,0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 900,
            animation: "slideUp 0.3s cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #DDD8D0",
              background: "#1C1C1C",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                border: "1px solid rgba(250,247,244,0.3)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={16} color="#FAF7F4" strokeWidth={1.5} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 16,
                  color: "#FAF7F4",
                  fontWeight: 400,
                }}
              >
                Noire Beauty Assistant
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "rgba(250,247,244,0.6)" }}>
                Ask me anything
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className="message-enter"
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 14px",
                    background: msg.role === "user" ? "#1C1C1C" : "white",
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
                <div
                  style={{
                    padding: "10px 16px",
                    background: "white",
                    border: "1px solid #DDD8D0",
                    borderRadius: "16px 16px 16px 2px",
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        background: "#DDD8D0",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              borderTop: "1px solid #DDD8D0",
              padding: "12px 16px",
              display: "flex",
              gap: 10,
              alignItems: "flex-end",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about products, skincare, orders..."
              rows={1}
              style={{
                flex: 1,
                border: "1px solid #DDD8D0",
                background: "white",
                padding: "10px 14px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 15,
                color: "#1C1C1C",
                resize: "none",
                outline: "none",
                borderRadius: 0,
                lineHeight: 1.4,
                maxHeight: 100,
                overflowY: "auto",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: 40,
                height: 40,
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
              <Send size={16} color="#FAF7F4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
