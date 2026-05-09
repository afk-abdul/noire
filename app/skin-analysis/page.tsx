"use client";
import { useState, useRef, CSSProperties } from "react";
import { Upload, Scan, Sparkles, RotateCcw, Camera } from "lucide-react";

interface AnalysisBarProps {
  label: string;
  value: number;
  color?: string;
  delay?: number;
}

function AnalysisBar({ label, value, color = "#1C1C1C", delay = 0 }: AnalysisBarProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 15,
            color: "#1C1C1C",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 14,
            color: "#1C1C1C",
            fontWeight: 500,
          }}
        >
          {value}/100
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: "#F0EBE4",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          className="load-bar"
          style={{
            height: "100%",
            background: color,
            borderRadius: 3,
            animationDelay: `${delay}s`,
            width: 0,
            "--target-width": `${value}%`,
          } as CSSProperties & { "--target-width": string }}
        />
      </div>
    </div>
  );
}

interface AnalysisData {
  skinType: string;
  overview: string;
  metrics: Record<string, number>;
  concerns: string[];
  recommendations: string[];
  routine: string;
}

export default function SkinAnalysisPage() {
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB.");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageUrl(result);
      setImage(result.split(",")[1]);
      setAnalysis(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/skin-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAnalysis(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Analysis failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setImageUrl(null);
    setAnalysis(null);
    setError(null);
  };

  const COLORS: Record<string, string> = {
    texture: "#1C1C1C",
    tone: "#8B7355",
    hydration: "#6B8E6B",
    radiance: "#8B6B6B",
    clarity: "#6B7A8B",
  };

  return (
    <div className="page-enter" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 32px 100px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div
          style={{
            width: 64,
            height: 64,
            border: "1px solid #DDD8D0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            background: "white",
          }}
        >
          <Scan size={26} strokeWidth={1.5} color="#1C1C1C" />
        </div>
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
          AI-Powered
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(30px, 5vw, 48px)",
            fontWeight: 400,
            color: "#1C1C1C",
            marginBottom: 16,
          }}
        >
          Skin Analysis
        </h1>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 17,
            color: "#6B6560",
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Upload a clear photo of your face and receive a personalized skin assessment with product recommendations tailored just for you.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: analysis ? "1fr 1fr" : "1fr",
          gap: 40,
          maxWidth: analysis ? 1100 : 600,
          margin: "0 auto",
          transition: "all 0.4s ease",
        }}
        className="analysis-grid"
      >
        {/* Upload / Preview */}
        <div>
          {!imageUrl ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? "#1C1C1C" : "#DDD8D0"}`,
                background: dragOver ? "#F0EBE4" : "white",
                padding: "60px 40px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
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
                  margin: "0 auto 20px",
                }}
              >
                <Camera size={28} strokeWidth={1} color="#6B6560" />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#1C1C1C", marginBottom: 8 }}>
                Upload Your Photo
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#6B6560", marginBottom: 20 }}>
                Drag & drop or click to select
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#B0A89E" }}>
                JPG, PNG, WEBP · Max 10MB
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <img
                src={imageUrl}
                alt="Uploaded"
                style={{
                  width: "100%",
                  maxHeight: 440,
                  objectFit: "cover",
                  display: "block",
                  border: "1px solid #DDD8D0",
                }}
              />
              {!loading && !analysis && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(28,28,28,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              )}
            </div>
          )}

          {error && (
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 14,
                color: "#C0392B",
                marginTop: 12,
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {imageUrl && (
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {!analysis && (
                <button
                  onClick={analyze}
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <Sparkles size={15} />
                  {loading ? "Analysing…" : "Analyse My Skin"}
                </button>
              )}
              <button
                onClick={reset}
                className="btn-outline"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 20px" }}
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
          )}

          {/* Tips */}
          {!imageUrl && (
            <div style={{ marginTop: 24, padding: "20px", background: "#F0EBE4", border: "1px solid #DDD8D0" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6560", marginBottom: 12 }}>
                Tips for Best Results
              </p>
              {["Use natural lighting, facing a window", "Remove makeup for most accurate analysis", "Face the camera directly, no angle", "Ensure your full face is visible"].map((tip, i) => (
                <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#6B6560", marginBottom: 6, display: "flex", gap: 8 }}>
                  <span style={{ color: "#1C1C1C" }}>—</span> {tip}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div style={{ animation: "slideUp 0.5s ease forwards" }}>
            <div style={{ background: "white", border: "1px solid #DDD8D0", padding: "32px" }}>
              <div style={{ marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid #DDD8D0" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#6B6560", marginBottom: 8 }}>
                  Your Skin Profile
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#1C1C1C", fontWeight: 400, marginBottom: 8 }}>
                  {analysis.skinType || "Combination Skin"}
                </h2>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#6B6560", lineHeight: 1.7 }}>
                  {analysis.overview}
                </p>
              </div>

              {/* Bars */}
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6560", marginBottom: 20 }}>
                  Skin Metrics
                </p>
                {analysis.metrics &&
                  Object.entries(analysis.metrics).map(([key, val], i) => (
                    <AnalysisBar
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={val}
                      color={COLORS[key] || "#1C1C1C"}
                      delay={i * 0.15}
                    />
                  ))}
              </div>

              {/* Concerns */}
              {analysis.concerns && analysis.concerns.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6560", marginBottom: 12 }}>
                    Key Concerns
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {analysis.concerns.map((c: string, i: number) => (
                      <span
                        key={i}
                        style={{
                          padding: "5px 14px",
                          border: "1px solid #DDD8D0",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 14,
                          color: "#1C1C1C",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {analysis.recommendations && (
                <div style={{ background: "#FAF7F4", padding: "20px", border: "1px solid #DDD8D0" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6560", marginBottom: 14 }}>
                    Product Recommendations
                  </p>
                  {analysis.recommendations.map((rec: any, i: number) => (
                    <div key={i} style={{ marginBottom: i < analysis.recommendations.length - 1 ? 12 : 0 }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#1C1C1C", marginBottom: 4 }}>
                        {rec.product || rec}
                      </p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#6B6560", lineHeight: 1.5 }}>
                        {rec.reason || ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Routine */}
              {analysis.routine && (
                <div style={{ marginTop: 20 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6560", marginBottom: 12 }}>
                    Daily Routine Tip
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#6B6560", lineHeight: 1.7, fontStyle: "italic" }}>
                    "{analysis.routine}"
                  </p>
                </div>
              )}
            </div>

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#B0A89E", textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>
              This analysis is AI-generated for informational purposes. Consult a dermatologist for medical advice.
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div
            style={{
              background: "white",
              border: "1px solid #DDD8D0",
              padding: "60px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                border: "2px solid #F0EBE4",
                borderTop: "2px solid #1C1C1C",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#1C1C1C", marginBottom: 8 }}>
                Analysing Your Skin
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#6B6560" }}>
                Our AI is studying your skin's unique characteristics…
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .analysis-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
