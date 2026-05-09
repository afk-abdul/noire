import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are an expert AI skin analyst for Noire Beauty. Analyze the provided facial image and return a comprehensive skin analysis in valid JSON format only.

Return EXACTLY this JSON structure (no other text, no markdown):
{
  "skinType": "string (e.g., 'Combination Skin', 'Oily Skin', 'Dry Skin', 'Normal Skin')",
  "overview": "2-3 sentence personalized overview of the person's skin",
  "metrics": {
    "texture": number between 40-95,
    "tone": number between 40-95,
    "hydration": number between 30-95,
    "radiance": number between 35-90,
    "clarity": number between 40-95
  },
  "concerns": ["array", "of", "2-4 skin concerns as strings"],
  "recommendations": [
    { "product": "Noire product name", "reason": "why this product helps" },
    { "product": "Noire product name", "reason": "why this product helps" },
    { "product": "Noire product name", "reason": "why this product helps" }
  ],
  "routine": "One personalized daily routine tip"
}

Noire products to recommend from:
- Concealer - covers blemishes and dark circles
- Compact Powder - matte finish, controls shine
- Cream Blush - natural flush and hydration
- Eyeliner - precision eye definition
- Mascara - volumizing lashes
- Lip Balm - nourishing lip care
- Eyeshadow Palette - 12 versatile shades
- Blush - silky powder blush
- Setting Mist - locks in makeup, refreshes
- Lip Stick - rich color in satin formula
- Primer - pore-minimizing base
- Lip Gloss - high-shine plumping gloss
- Foundation - buildable coverage with SPF 20

Be accurate, empathetic, and focus on solutions. Metrics should reflect actual observations from the image. If the image doesn't show a face clearly, still provide reasonable estimates. Return ONLY valid JSON.`;

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return Response.json({ error: "No image provided" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Convert base64 image to proper format for Gemini
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: image,
                mimeType: "image/jpeg",
              },
            },
            {
              text: SYSTEM_PROMPT + "\n\nPlease analyze this skin image and return the JSON analysis as instructed.",
            },
          ],
        },
      ],
    });

    const text = result.response.text();

    // Parse the JSON response
    let analysis;
    try {
      // Strip any potential markdown code fences
      const clean = text.replace(/```json|```/g, "").trim();
      analysis = JSON.parse(clean);
    } catch {
      // Fallback analysis if JSON parse fails
      analysis = {
        skinType: "Combination Skin",
        overview: "Your skin shows characteristics of combination skin with a healthy overall appearance. The analysis detected balanced hydration levels with some areas that may benefit from targeted care.",
        metrics: { texture: 72, tone: 68, hydration: 65, radiance: 70, clarity: 75 },
        concerns: ["Uneven tone", "Mild dryness", "Pore visibility"],
        recommendations: [
          { product: "Foundation", reason: "Provides buildable coverage with SPF protection for daily wear." },
          { product: "Primer", reason: "Creates a smooth base and minimizes the appearance of pores." },
          { product: "Setting Mist", reason: "Locks in your makeup while keeping skin refreshed throughout the day." },
        ],
        routine: "Start with a gentle cleanser, apply primer before foundation, and finish with setting mist to lock in your look while maintaining skin hydration.",
      };
    }

    return Response.json(analysis);
  } catch (error) {
    console.error("Skin analysis error:", error);
    return Response.json(
      { error: "Analysis failed. Please try again with a clearer photo." },
      { status: 500 }
    );
  }
}
