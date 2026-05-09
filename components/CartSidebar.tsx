"use client";
import { useState } from "react";
import { X, Minus, Plus, ShoppingBag, CheckCircle, AlertCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CartSidebar() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, checkout } = useStore();
  const [checkoutState, setCheckoutState] = useState<string | null>(null); // null | "processing" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutState("processing");
    await new Promise((r) => setTimeout(r, 1000));
    const result = checkout();
    if (result.success) {
      setCheckoutState("success");
    } else {
      setErrorMsg(result.message || "Checkout failed.");
      setCheckoutState("error");
    }
  };

  const handleClose = () => {
    setCartOpen(false);
    if (checkoutState === "success" || checkoutState === "error") {
      setTimeout(() => setCheckoutState(null), 300);
    }
  };

  if (!cartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(28,28,28,0.4)",
          zIndex: 1100,
          backdropFilter: "blur(2px)",
        }}
        className="overlay-enter"
      />

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(420px, 100vw)",
          background: "#FAF7F4",
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(28,28,28,0.12)",
          animation: "slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) forwards",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 28px",
            borderBottom: "1px solid #DDD8D0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingBag size={20} strokeWidth={1.5} color="#1C1C1C" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 400,
                color: "#1C1C1C",
              }}
            >
              Your Bag
            </h2>
            {cart.length > 0 && (
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 13,
                  color: "#6B6560",
                }}
              >
                ({cart.reduce((s, i) => s + i.qty, 0)} items)
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6B6560",
              padding: 4,
              borderRadius: 4,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {checkoutState === "success" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 20,
                textAlign: "center",
                padding: "40px 0",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "#F0EBE4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle size={36} strokeWidth={1.5} color="#1C1C1C" />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24,
                  fontWeight: 400,
                  color: "#1C1C1C",
                }}
              >
                Order Confirmed
              </h3>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16,
                  color: "#6B6560",
                  lineHeight: 1.7,
                }}
              >
                Thank you for your purchase. Your Noire order has been placed successfully. We'll be in touch soon.
              </p>
              <button
                onClick={handleClose}
                className="btn-primary"
                style={{ marginTop: 12 }}
              >
                Continue Shopping
              </button>
            </div>
          ) : checkoutState === "error" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 16,
                textAlign: "center",
                padding: "40px 0",
              }}
            >
              <AlertCircle size={40} strokeWidth={1.5} color="#C0392B" />
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 400,
                  color: "#1C1C1C",
                }}
              >
                Unable to Complete
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#6B6560" }}>
                {errorMsg}
              </p>
              <button onClick={() => setCheckoutState(null)} className="btn-outline">
                Try Again
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "60%",
                gap: 16,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  border: "1px solid #DDD8D0",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShoppingBag size={28} strokeWidth={1} color="#DDD8D0" />
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 17,
                  color: "#6B6560",
                }}
              >
                Your bag is empty
              </p>
              <button
                onClick={handleClose}
                className="btn-outline"
                style={{ fontSize: 13 }}
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {cart.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "18px 0",
                    borderBottom: i < cart.length - 1 ? "1px solid #DDD8D0" : "none",
                    animation: "fadeIn 0.3s ease forwards",
                  }}
                >
                  {/* Image placeholder */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      background: "#F0EBE4",
                      borderRadius: 2,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: "#6B6560", fontStyle: "italic" }}>
                        {item.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <p
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 14,
                          color: "#1C1C1C",
                          fontWeight: 500,
                        }}
                      >
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#6B6560", padding: 0 }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 15,
                        color: "#1C1C1C",
                        marginBottom: 10,
                      }}
                    >
                      Rs {(item.price * item.qty).toLocaleString()}
                    </p>
                    {/* Qty */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        style={{
                          width: 26,
                          height: 26,
                          border: "1px solid #DDD8D0",
                          background: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#1C1C1C",
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, minWidth: 16, textAlign: "center" }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        style={{
                          width: 26,
                          height: 26,
                          border: "1px solid #DDD8D0",
                          background: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#1C1C1C",
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && checkoutState !== "success" && checkoutState !== "error" && (
          <div
            style={{
              borderTop: "1px solid #DDD8D0",
              padding: "24px 28px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#6B6560" }}>Subtotal</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#1C1C1C" }}>
                Rs {cartTotal.toLocaleString()}
              </span>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#6B6560", marginBottom: 18 }}>
              Shipping & taxes calculated at checkout
            </p>
            <button
              onClick={handleCheckout}
              disabled={checkoutState === "processing"}
              className="btn-primary"
              style={{ width: "100%", textAlign: "center", opacity: checkoutState === "processing" ? 0.7 : 1 }}
            >
              {checkoutState === "processing" ? "Processing..." : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
