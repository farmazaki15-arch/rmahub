import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Initialize state
let newsletterSubscribers: { email: string; timestamp: string; categories: string[] }[] = [];
let affiliateStats = [
  { serviceId: 'rank-in-chatgpt', serviceName: 'ChatGPT SEO Masterclass Course', clicks: 231, salesSimulated: 18, commissionEarned: 427.5 },
  { serviceId: 'review-rankforge-ai', serviceName: 'RankForge AI Subscription', clicks: 142, salesSimulated: 8, commissionEarned: 196.0 },
  { serviceId: 'alternative-credits', serviceName: 'Partner Tech Alternative Listings', clicks: 89, salesSimulated: 4, commissionEarned: 40.0 }
];

app.use(express.json());

// Initialize GoogleGenAI client lazily to avoid startup crash on missing key
let aiClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Features will run in Mock Mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ==========================================
// API ROUTES FIRST (Required by Guidelines)
// ==========================================

// Get telemetry metrics & stats
app.get("/api/telemetry/stats", (req, res) => {
  const totalClicks = affiliateStats.reduce((sum, item) => sum + item.clicks, 0);
  const totalSales = affiliateStats.reduce((sum, item) => sum + item.salesSimulated, 0);
  const totalCommission = affiliateStats.reduce((sum, item) => sum + item.commissionEarned, 0);
  
  res.json({
    affiliateStats,
    totalClicks,
    totalSales,
    totalCommission,
    subscribersCount: newsletterSubscribers.length,
    activeReadersToday: 4280 + Math.floor(Math.random() * 45) // simulated real-time index
  });
});

// Record a click event on an affiliate or sponsored link
app.post("/api/telemetry/click", (req, res) => {
  const { serviceId } = req.body;
  if (!serviceId) {
    return res.status(400).json({ error: "serviceId is required" });
  }

  let matched = affiliateStats.find(item => item.serviceId === serviceId);
  if (!matched) {
    matched = {
      serviceId,
      serviceName: serviceId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      clicks: 0,
      salesSimulated: 0,
      commissionEarned: 0
    };
    affiliateStats.push(matched);
  }

  // Increment metrics
  matched.clicks += 1;
  
  // 5% chance of simulating a conversion/sale
  if (Math.random() < 0.05) {
    matched.salesSimulated += 1;
    // Course conversion lands $35, SaaS subscription lands $24.5
    const saleValue = serviceId.includes('masterclass') || serviceId.includes('chatgpt') ? 35.0 : 24.5;
    matched.commissionEarned = parseFloat((matched.commissionEarned + saleValue).toFixed(2));
  }

  res.json({ success: true, updatedStats: matched });
});

// Newsletter signups
app.post("/api/newsletter/subscribe", (req, res) => {
  const { email, categories } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: "A valid email address is required" });
  }

  // Check if already exists
  const exists = newsletterSubscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase());
  if (!exists) {
    newsletterSubscribers.push({
      email,
      timestamp: new Date().toISOString(),
      categories: categories || ['ai-news', 'tech-news', 'reviews']
    });
  }

  res.json({
    success: true,
    message: "Thank you for joining FarmaOnline! You will receive our premium digital trends reports.",
    subscribersCount: newsletterSubscribers.length
  });
});

// 🧠 Advanced AI Feature: Content Suggester and Auto-Categorization Writer
app.post("/api/ai/suggestion", async (req, res) => {
  const { keyword, category, focusType, promptIdea, useHighThinking } = req.body;
  
  const userCategory = category || "AI News";
  const userKeyword = keyword || "AI search optimization";
  const userFocus = focusType || "comprehensive analysis";
  const extraContext = promptIdea || "Write about the upcoming trends in this space.";

  const ai = getGenAI();
  if (!ai) {
    // Elegant fallback mock system so the application is ALWAYS robust and beautifully working!
    const mockTitle = `Advanced Blueprint: Mastering ${userKeyword} in 2026`;
    const mockOutline = `1. Introduction to ${userKeyword}\n2. Operational Blueprint details tailored for ${userCategory} publishers\n3. High-Converting Affiliate course models\n4. Predictive ROI metrics`;
    const mockArticle = `## How to Master ${userKeyword}\n\nThis is a highly optimized, dynamically structured blueprint designed to secure elite traffic. In our evaluation of **${userCategory}**, we discovered that traditional indexation models miss the point. Conversational scrapers rely on semantic certainty.\n\n### Key Spec Checklist:\n* Fully automated JSON integration\n* Standard schema matching triggers\n* 40% higher conversion rates\n\n### Verdict Recommendation:\nTo fast-track your progression, consider pairing these recommendations with the **ChatGPT SEO Masterclass** at [https://farmaonline.academy/chatgpt-seo-masterclass](https://farmaonline.academy/chatgpt-seo-masterclass) for a robust hands-on execution pipeline. Use coupon **FARMAONLINE** for 25% discount.`;

    return res.json({
      title: mockTitle,
      category: userCategory,
      readingTime: "5 min read",
      tags: [userKeyword.split(" ")[0] || "AI", "Authority", "SEO"],
      outline: mockOutline,
      content: mockArticle,
      note: "Running in Smart Simulation Mode (Configure process.env.GEMINI_API_KEY in the Secrets menu to see live Gemini outputs!)"
    });
  }

  try {
    // Choose model based on setting
    const modelToUse = useHighThinking ? "gemini-3.1-pro-preview" : "gemini-3.5-flash";
    
    // Construct prompt
    const systemPrompt = `You are a high-performance content strategist, copywriter, and senior publisher for FarmaOnline, a premium tech news, tech trends, and affiliate review resource.
Your task is to write a highly compelling, SEO-optimized, engaging article outline, draft, and recommended monetization hooks based on the user's keywords, category, and target focus.

Respond in strict JSON format with the following keys:
- "title": a robust, hooky headline for the article.
- "category": either "AI News", "Tech News", or "Product Reviews".
- "readingTime": estimated reading time like "6 min read".
- "tags": array of 3-4 string tags.
- "outline": bulleted structural outline.
- "content": beautiful markdown content including a brief introduction, practical checklist, high-converting affiliate suggestion referencing "ChatGPT SEO Masterclass" or "RankForge AI", and a strong professional verdict.

Generate valid, easily parseable JSON containing only these keys. Do not prepend markdown wraps.`;

    const contents = `Create an article on:
Category: ${userCategory}
Focus Keyword: ${userKeyword}
Target Focus Style: ${userFocus}
Context: ${extraContext}
Use High Thinking Mode: ${useHighThinking ? "Yes (maximize reasoning and outline strategic depth)" : "No"}`;

    const config: any = {
      responseMimeType: "application/json",
      systemInstruction: systemPrompt,
    };

    // Apply thinking config if using gemini-3.1-pro-preview
    if (useHighThinking) {
      config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
    }

    const response = await ai.models.generateContent({
      model: modelToUse,
      contents,
      config
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({
      ...parsedData,
      modeUsed: modelToUse
    });

  } catch (error: any) {
    console.error("Gemini API Error in Server Handler: ", error);
    res.status(500).json({
      error: "Failed to generate dynamic content due to high API load. Running mock fallback.",
      fallback: {
        title: `The Ultimate Guide to ${userKeyword}`,
        category: userCategory,
        readingTime: "6 min read",
        tags: ["SEO", "Automation", "Publishing"],
        outline: `1. Overview of ${userKeyword}\n2. Practical schema integrations\n3. Affiliate conversion rules`,
        content: `### High-Performance Deep Dive on ${userKeyword}\n\nOur real-time crawler logs show conversational engines actively selecting websites that provide crystal-clear markdown representations. Implement hierarchical tables and explicit bulleted lists.\n\nWe recommend enrolling in the official **ChatGPT SEO Masterclass** to secure your digital footprint ahead of competitive channels.`
      }
    });
  }
});


// ==========================================
// VITE AND STATIC ASSETS SERVING MIDDLEWARE
// ==========================================

async function startServer() {
  const isTestingProduction = process.env.NODE_ENV === "production";

  if (!isTestingProduction) {
    // Mount Vite middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built static assets from dist/
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Bind to host 0.0.0.0 and port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FarmaOnline FULLSTACK] Server booting on port ${PORT}`);
    console.log(`[FarmaOnline FULLSTACK] Accessible at http://localhost:${PORT}`);
  });
}

startServer();
