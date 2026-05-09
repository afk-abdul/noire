"use client";
import { useState, useRef } from "react";
import { useStore } from "@/context/StoreContext";
import type { Product } from "@/context/StoreContext";
import { Plus, Trash2, Edit3, Save, X, Package, TrendingUp, AlertTriangle } from "lucide-react";

const CATEGORIES = ["Face", "Eyes", "Lips", "Cheeks"];

const EMPTY_FORM = { name: "", price: "", stock: "", category: "Face", description: "", image: null as string | null };

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [form, setForm] = useState<{ name: string; price: string; stock: string; category: string; description: string; image: string | null }>(EMPTY_FORM);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setForm((f) => ({ ...f, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.stock) return;
    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };
    if (editId) {
      updateProduct(editId, productData);
    } else {
      addProduct(productData);
    }
    setForm(EMPTY_FORM);
    setImagePreview(null);
    setEditId(null);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const startEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: String(product.price),
      stock: String(product.stock),
      category: product.category,
      description: product.description || "",
      image: product.image,
    });
    setImagePreview(product.image);
    setEditId(product.id);
    setShowForm(true);
    setActiveTab("add");
  };

  const cancelForm = () => {
    setForm(EMPTY_FORM);
    setImagePreview(null);
    setEditId(null);
    setShowForm(false);
  };

  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock <= 3 && p.stock > 0);
  const outOfStock = products.filter((p) => p.stock <= 0);

  return (
    <div className="page-enter" style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px 100px" }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#6B6560", marginBottom: 8 }}>
          Administration
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, color: "#1C1C1C", marginBottom: 4 }}>
          Product Management
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#6B6560" }}>
          Manage your Noire collection, inventory, and product details.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 40 }}>
        {[
          { label: "Total Products", value: products.length, icon: <Package size={20} strokeWidth={1.5} /> },
          { label: "Total Stock", value: totalStock, icon: <TrendingUp size={20} strokeWidth={1.5} /> },
          { label: "Low Stock", value: lowStock.length, icon: <AlertTriangle size={20} strokeWidth={1.5} />, warn: lowStock.length > 0 },
          { label: "Out of Stock", value: outOfStock.length, icon: <X size={20} strokeWidth={1.5} />, error: outOfStock.length > 0 },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "white",
              border: `1px solid ${stat.error ? "#E0B0B0" : stat.warn ? "#DDD8A0" : "#DDD8D0"}`,
              padding: "20px 24px",
            }}
          >
            <div style={{ color: stat.error ? "#C0392B" : stat.warn ? "#8B7A10" : "#6B6560", marginBottom: 10 }}>
              {stat.icon}
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#1C1C1C", marginBottom: 4 }}>
              {stat.value}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#6B6560", letterSpacing: "0.08em" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #DDD8D0", marginBottom: 32 }}>
        {["products", "add"].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); if (tab === "add" && !editId) { setForm(EMPTY_FORM); setImagePreview(null); } }}
            style={{
              padding: "14px 28px",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid #1C1C1C" : "2px solid transparent",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: activeTab === tab ? "#1C1C1C" : "#6B6560",
              cursor: "pointer",
              marginBottom: -1,
              transition: "all 0.2s ease",
            }}
          >
            {tab === "products" ? "All Products" : editId ? "Edit Product" : "Add Product"}
          </button>
        ))}
      </div>

      {saved && (
        <div style={{ background: "#F0EBE4", border: "1px solid #DDD8D0", padding: "12px 20px", marginBottom: 24, fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#1C1C1C", display: "flex", alignItems: "center", gap: 10 }}>
          <Save size={15} /> Product saved successfully.
        </div>
      )}

      {/* Products Table */}
      {activeTab === "products" && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
            <button onClick={() => { setActiveTab("add"); setForm(EMPTY_FORM); setImagePreview(null); setEditId(null); }} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Plus size={16} /> Add Product
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #DDD8D0" }}>
                  {["Product", "Category", "Price (Rs)", "Stock", "Status", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6560", fontWeight: 400, whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #DDD8D0", background: i % 2 === 0 ? "white" : "#FAF7F4" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 44, height: 44, background: "#F0EBE4", flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {p.image ? <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#DDD8D0" }}>{p.name.charAt(0)}</span>}
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#1C1C1C" }}>{p.name}</p>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#6B6560" }}>{p.description?.slice(0, 40)}...</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#6B6560" }}>{p.category}</td>
                    <td style={{ padding: "14px 16px", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#1C1C1C" }}>{p.price?.toLocaleString()}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <input
                        type="number"
                        min="0"
                        value={p.stock}
                        onChange={(e) => updateProduct(p.id, { stock: Number(e.target.value) })}
                        style={{ width: 70, border: "1px solid #DDD8D0", padding: "6px 10px", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, background: "white", outline: "none", color: "#1C1C1C" }}
                      />
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        padding: "3px 12px",
                        background: p.stock <= 0 ? "#F8E8E8" : p.stock <= 3 ? "#FFF8E8" : "#E8F8E8",
                        color: p.stock <= 0 ? "#C0392B" : p.stock <= 3 ? "#8B7A10" : "#2C7A2C",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 13,
                        border: `1px solid ${p.stock <= 0 ? "#E0B0B0" : p.stock <= 3 ? "#DDD8A0" : "#B0D8B0"}`,
                      }}>
                        {p.stock <= 0 ? "Out of Stock" : p.stock <= 3 ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => startEdit(p)} style={{ background: "none", border: "1px solid #DDD8D0", padding: "6px 10px", cursor: "pointer", color: "#1C1C1C", display: "flex", alignItems: "center" }}>
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => deleteProduct(p.id)} style={{ background: "none", border: "1px solid #E0B0B0", padding: "6px 10px", cursor: "pointer", color: "#C0392B", display: "flex", alignItems: "center" }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {activeTab === "add" && (
        <div style={{ maxWidth: 680 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6560", display: "block", marginBottom: 8 }}>Product Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Velvet Matte Lipstick" className="noire-input" />
            </div>

            <div>
              <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6560", display: "block", marginBottom: 8 }}>Price (Rs) *</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0" className="noire-input" />
            </div>

            <div>
              <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6560", display: "block", marginBottom: 8 }}>Stock Quantity *</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0" className="noire-input" />
            </div>

            <div>
              <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6560", display: "block", marginBottom: 8 }}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="noire-input" style={{ appearance: "none", cursor: "pointer" }}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6560", display: "block", marginBottom: 8 }}>Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Briefly describe the product..." className="noire-input" rows={3} style={{ resize: "vertical" }} />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6560", display: "block", marginBottom: 8 }}>Product Image</label>
              <div
                onClick={() => fileRef.current?.click()}
                style={{ border: "2px dashed #DDD8D0", padding: "32px", textAlign: "center", cursor: "pointer", background: "white", transition: "border-color 0.2s ease" }}
              >
                {imagePreview ? (
                  <div>
                    <img src={imagePreview} alt="Preview" style={{ maxHeight: 200, maxWidth: "100%", objectFit: "contain", marginBottom: 12 }} />
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#6B6560" }}>Click to change image</p>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#6B6560", marginBottom: 6 }}>Click to upload product image</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#B0A89E" }}>PNG, JPG, WEBP</p>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e.target.files?.[0])} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={handleSubmit} disabled={!form.name || !form.price || !form.stock} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, opacity: (!form.name || !form.price || !form.stock) ? 0.5 : 1 }}>
              <Save size={15} />
              {editId ? "Save Changes" : "Add Product"}
            </button>
            <button onClick={cancelForm} className="btn-outline" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <X size={15} /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
