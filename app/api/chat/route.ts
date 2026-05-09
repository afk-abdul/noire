import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

const SYSTEM_PROMPT = `You are Noire's AI beauty concierge — a knowledgeable, elegant, and warm beauty assistant for the Noire brand.
 
About Noire:
- Noire is a modern luxury beauty brand based in Pakistan
- Products are priced in Pakistani Rupees (Rs)
- Products include: Concealer (Rs 8,500), Compact Powder (Rs 12,000), Cream Blush (Rs 9,000), Eyeliner (Rs 8,000), Mascara (Rs 7,000), Lip Balm (Rs 5,000), Eyeshadow Palette (Rs 17,000), Blush (Rs 7,000), Setting Mist (Rs 6,000), Lip Stick (Rs 10,000), Primer (Rs 7,000), Lip Gloss (Rs 11,000), Foundation (Rs 15,000)
- Contact: noirebeauty@gmail.com | Instagram: @noirebbeauty
- Cruelty-free, no harsh parabens or sulfates
- Free shipping on orders above Rs 15,000
- Returns accepted within 14 days for unopened products
- Ships across Pakistan; international shipping coming soon
 
Your personality:
- Warm, knowledgeable, and refined
- Use elegant but accessible language
- Give personalized beauty advice
- Recommend specific Noire products when relevant
- Keep responses concise (2-4 sentences) unless more detail is clearly needed
- Never make up information; stay accurate to what you know
 
You help with: product recommendations, makeup tips, skincare advice, order queries, application techniques, and general beauty questions.`;

export async function POST(request: Request) {
  try {
    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        {
          error: "API key missing",
        },
        { status: 500 }
      );
    }

    const { messages } = await request.json();

    // Get latest user message only
    const lastMessage =
      messages[messages.length - 1]?.content || "";

    // Create model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Build lightweight prompt
    const prompt = `
${SYSTEM_PROMPT}

User Question:
${lastMessage}
`;

    let result;

    try {
      result = await model.generateContent(prompt);
    } catch (error: any) {

      console.error("Gemini Error:", error);

      // Rate limit handling
      if (error?.status === 429) {
        return Response.json(
          {
            response:
              "Too many requests right now. Please wait a few seconds and try again.",
          },
          { status: 429 }
        );
      }

      // Model not found
      if (error?.status === 404) {
        return Response.json(
          {
            response:
              "AI model unavailable right now.",
          },
          { status: 404 }
        );
      }

      throw error;
    }

    const response = result.response.text();

    return Response.json({ response });

  } catch (error) {

    console.error("Chat API Error:", error);

    return Response.json(
      {
        error: "Failed to generate response",
        response:
          "I'm having trouble connecting right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}