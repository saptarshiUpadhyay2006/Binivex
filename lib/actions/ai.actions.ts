"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Binivex AI, a professional and highly intelligent fintech assistant for the Binivex platform.
Your goal is to help users understand the stock market, analyze symbols, and provide insights into financial data.

Tone: Professional, helpful, concise, and data-driven.
Expertise: Stock market trends, technical analysis basics, financial news interpretation, and platform guidance.

Always mention that financial investments carry risk and users should do their own research.
If asked about specific stocks on the Binivex platform, encourage them to use the Search feature to see real-time charts and data.
`;

const model = genAI.getGenerativeModel({ 
  model: "gemini-flash-latest"
});

export async function chatWithAI(messages: { role: 'user' | 'model', content: string }[]) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { success: false, error: "GEMINI_API_KEY is not defined in .env" };
    }

    const lastMessage = messages[messages.length - 1].content;
    
    // Construct a simple prompt from the last few messages for context
    const context = messages.slice(-5).map(m => `${m.role}: ${m.content}`).join("\n");
    
    // Prepend system prompt to ensure personality with gemini-pro
    const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${context}\n\nUser: ${lastMessage}\nAI:`;

    console.log("Generating AI Response...");
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
        throw new Error("AI returned an empty response.");
    }

    return { success: true, content: text };
  } catch (error: any) {
    console.error("AI Action Error:", error);
    return { success: false, error: error.message || "Unknown AI error" };
  }
}

export async function analyzeStock(params: {
  symbol: string;
  priceData: QuoteData;
  newsArticles: MarketNewsArticle[];
}) {
  const { symbol, priceData, newsArticles } = params;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { success: false, error: "GEMINI_API_KEY is not defined" };
    }

    const newsContext = newsArticles
      .slice(0, 5)
      .map(a => `- ${a.headline} (${a.source})`)
      .join("\n");

    const analysisPrompt = `
      As Binivex AI, provide a premium "Binivex Intelligence Report" for ${symbol}.
      
      Current Market Data for ${symbol}:
      - Price: $${priceData.c || 'N/A'}
      - Day Change: ${priceData.dp || 0}%
      
      Recent News Context:
      ${newsContext}

      Structure your report with the following sections using markdown:
      1. **Market Sentiment Summary**: Briefly describe the current mood for ${symbol}.
      2. **Intelligence Insights (Pros & Cons)**: Provide 2-3 bullet points for Bullish signals and Bearish risks.
      3. **Technical Outlook**: Based on the price action (up/down), what is the immediate outlook?
      4. **Binivex Verdict**: A concise summary statement.

      Keep the tone elite, data-driven, and professional. 
      Include a short disclaimer at the end about financial risk.
    `;

    console.log(`Analyzing ${symbol}...`);
    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const text = response.text();

    return { success: true, content: text };
  } catch (error: any) {
    console.error("Stock Analysis Error:", error);
    return { success: false, error: error.message || "Failed to analyze stock" };
  }
}
