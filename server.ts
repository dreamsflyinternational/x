import express from "express";
import path from "path";
import fs from "fs";
import compression from "compression";
import { createServer as createViteServer, ViteDevServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { injectSeoIntoHtml } from "./src/lib/serverSeo";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable Gzip Compression for high Core Web Vitals speed & low TTFB
app.use(compression());

// Security & Performance Headers & Auto-Language Cookie Injection
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // Fast Backend IP Language Detection Cookie Initialization
  if (!req.path.startsWith("/api") && !req.path.includes(".")) {
    const cookieHeader = req.headers.cookie || "";
    if (!cookieHeader.includes("googtrans=") && !cookieHeader.includes("df_user_lang_pref=")) {
      const cfCountry = (req.headers["cf-ipcountry"] as string || "").toUpperCase();
      const xCountry = (req.headers["x-country-code"] as string || req.headers["x-ip-country"] as string || "").toUpperCase();
      const acceptLang = (req.headers["accept-language"] as string || "").toLowerCase();

      let isBD = cfCountry === "BD" || xCountry === "BD";
      if (!cfCountry && !xCountry) {
        if (acceptLang.includes("bn") || acceptLang.includes("bd")) {
          isBD = true;
        }
      }

      const targetLang = isBD ? "/bn/bn" : "/bn/en";
      res.setHeader("Set-Cookie", `googtrans=${targetLang}; Path=/; SameSite=Lax`);
    }
  }

  next();
});

app.use(express.json({ limit: "10mb" }));

// Fast Geo-IP Endpoint for Instant Client Language Determination
app.get("/api/geo-ip", (req, res) => {
  const cfCountry = (req.headers["cf-ipcountry"] as string || "").toUpperCase();
  const xCountry = (req.headers["x-country-code"] as string || req.headers["x-ip-country"] as string || "").toUpperCase();
  const acceptLang = (req.headers["accept-language"] as string || "").toLowerCase();

  let isBD = cfCountry === "BD" || xCountry === "BD";
  if (!cfCountry && !xCountry) {
    if (acceptLang.includes("bn") || acceptLang.includes("bd")) {
      isBD = true;
    }
  }

  const countryCode = isBD ? "BD" : (cfCountry || xCountry || "INTL");
  res.json({
    isBangladesh: isBD,
    countryCode,
    countryName: isBD ? "Bangladesh" : (countryCode === "INTL" ? "International" : countryCode),
    lang: isBD ? "bn" : "en"
  });
});

// Explicit Robots.txt & Sitemap.xml Routes
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://dreamsfly.net/sitemap.xml
Host: https://dreamsfly.net`);
});

app.get("/sitemap.xml", (_req, res) => {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  if (fs.existsSync(sitemapPath)) {
    res.type("application/xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.sendFile(sitemapPath);
  } else {
    res.status(404).send("Sitemap not found");
  }
});

// SMTP Transporter for smmbuy2022@gmail.com
const smtpEmail = process.env.SMTP_EMAIL || "smmbuy2022@gmail.com";
const smtpPass = (process.env.SMTP_APP_PASSWORD || "cozi ibbt kzwp xato").replace(/\s+/g, "");

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtpEmail,
    pass: smtpPass,
  },
});

async function sendNotificationEmail(formData: Record<string, any>) {
  const recipient = smtpEmail;
  const formType = formData.type || formData.selectedService || formData.subject || formData.service || "New Web Inquiry";
  const senderName = formData.fullName || formData.name || formData.consultName || "Website Customer";
  const subject = `[Dreams Fly Lead] ${formType} - ${senderName}`;

  const rowsHtml = Object.entries(formData)
    .filter(([_, val]) => val !== undefined && val !== null && val !== "")
    .map(([key, val]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      const displayVal = typeof val === "object" ? JSON.stringify(val, null, 2) : String(val);
      return `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 14px; font-weight: bold; background-color: #f8fafc; color: #1e293b; width: 35%; font-size: 13px;">${formattedKey}</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; line-height: 1.5;">${displayVal}</td>
        </tr>
      `;
    })
    .join("");

  const htmlContent = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <div style="background-color: #b71c1c; padding: 24px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">✈️ Dreams Fly International</h2>
        <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">New Website Lead Notification</p>
      </div>
      <div style="padding: 24px;">
        <p style="font-size: 14px; color: #334155; margin-top: 0; margin-bottom: 16px;">
          <strong>New lead received from ${senderName}:</strong>
        </p>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
        <div style="margin-top: 24px; padding: 12px 16px; background-color: #f1f5f9; border-radius: 8px; font-size: 12px; color: #64748b; text-align: center;">
          Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} (Bangladesh Time)
        </div>
      </div>
    </div>
  `;

  try {
    const info = await mailTransporter.sendMail({
      from: `"Dreams Fly Website" <${smtpEmail}>`,
      to: recipient,
      subject: subject,
      text: JSON.stringify(formData, null, 2),
      html: htmlContent,
    });
    console.log("Email notification sent successfully:", info.messageId);
    return true;
  } catch (err) {
    console.error("Failed to send email via SMTP:", err);
    return false;
  }
}

// Lazy GoogleGenAI initialization
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Health
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", agency: "Dreams Fly International", timestamp: new Date().toISOString() });
});

// Mock Applications Database
const mockApplications: Record<string, any> = {
  "DF-98231": {
    id: "DF-98231",
    applicantName: "Tanvir Ahmed",
    country: "Canada",
    visaType: "Tourist Visa (V-1)",
    submissionDate: "2026-07-10",
    status: "Embassy Processing",
    progressPercent: 75,
    estimatedCompletion: "2026-08-05",
    assignedConsultant: "Mr. Jahangir Alam (Senior Visa Officer)",
    passportNumber: "A08923412",
    embassyReference: "CAN-DHK-88129",
    timeline: [
      { step: "Application Submitted", date: "2026-07-10", completed: true, note: "Documents received by Dreams Fly team" },
      { step: "Document Verification", date: "2026-07-12", completed: true, note: "Bank statement & NOC attestation verified" },
      { step: "Embassy Appointment", date: "2026-07-18", completed: true, note: "VFS Global Dhaka Biometrics completed" },
      { step: "Embassy Processing", date: "2026-07-20", completed: true, note: "Under review at High Commission of Canada" },
      { step: "Passport Stamping & Collection", date: "Pending", completed: false, note: "Awaiting dispatch notice" },
    ]
  },
  "DF-10492": {
    id: "DF-10492",
    applicantName: "Nusrat Jahan",
    country: "United Kingdom",
    visaType: "Student Visa (CAS Tier 4)",
    submissionDate: "2026-07-15",
    status: "Visa Approved & Ready",
    progressPercent: 100,
    estimatedCompletion: "2026-07-26",
    assignedConsultant: "Ms. Farhana Akhtar",
    passportNumber: "B09128374",
    embassyReference: "UK-DHK-99210",
    timeline: [
      { step: "Application Submitted", date: "2026-07-15", completed: true, note: "CAS Letter attached" },
      { step: "Document Verification", date: "2026-07-16", completed: true, note: "IELTS & Bank statement approved" },
      { step: "Biometrics Appointment", date: "2026-07-19", completed: true, note: "VFS Sylhet session completed" },
      { step: "Embassy Processing", date: "2026-07-21", completed: true, note: "Approved by UK Visas & Immigration" },
      { step: "Passport Collection", date: "2026-07-26", completed: true, note: "Passport ready at Dreams Fly Office" },
    ]
  },
  "DF-55102": {
    id: "DF-55102",
    applicantName: "Mohammad Rafiq",
    country: "Saudi Arabia",
    visaType: "Umrah Premium Package",
    submissionDate: "2026-07-22",
    status: "Document Verification",
    progressPercent: 35,
    estimatedCompletion: "2026-08-01",
    assignedConsultant: "Hafiz Maulana Zubair",
    passportNumber: "C07129482",
    embassyReference: "SA-UMR-11029",
    timeline: [
      { step: "Package Booking", date: "2026-07-22", completed: true, note: "5-Star Makkah & Madinah package selected" },
      { step: "Document Verification", date: "2026-07-24", completed: true, note: "Biometric enrollment in process" },
      { step: "Nusuk Portal Submission", date: "Pending", completed: false, note: "Queue slot scheduled" },
      { step: "Flight & Hotel Confirmation", date: "Pending", completed: false, note: "Biman Bangladesh Airlines reserved" },
      { step: "Visa Issued", date: "Pending", completed: false, note: "Final e-visa issue" },
    ]
  }
};

// Track Application Status API
app.get("/api/application/track/:id", (req, res) => {
  const appId = req.params.id.toUpperCase().trim();
  const application = mockApplications[appId];

  if (!application) {
    return res.status(404).json({
      success: false,
      message: `No application found for ID: ${appId}. Try DF-98231, DF-10492, or DF-55102.`
    });
  }

  res.json({
    success: true,
    data: application
  });
});

// AI Travel Planner Endpoint
app.post("/api/gemini/plan-itinerary", async (req, res) => {
  try {
    const { destination, durationDays, travelerType, interests, budgetTier } = req.body;

    if (!destination) {
      return res.status(400).json({ error: "Destination is required" });
    }

    const ai = getAiClient();
    const prompt = `You are the lead travel & visa expert at Dreams Fly International (https://dreamsfly.net/).
Generate a high-end, detailed travel itinerary and visa preparation guide for:
Destination: ${destination}
Duration: ${durationDays || 5} days
Traveler Type: ${travelerType || 'Family / Leisure'}
Interests: ${interests || 'Culture, Sightseeing, Local Cuisine'}
Budget Tier: ${budgetTier || 'Luxury / Mid-range'}

Return a structured JSON object with the following JSON schema:
{
  "title": "String title for itinerary",
  "summary": "Short 2-sentence executive summary",
  "visaTips": ["Tip 1", "Tip 2", "Tip 3"],
  "recommendedBestTime": "Best season to visit",
  "estimatedBudgetUSD": "Approx cost range per person",
  "dayByDay": [
    {
      "day": 1,
      "theme": "Day title",
      "morning": "Morning activities",
      "afternoon": "Afternoon activities",
      "evening": "Evening & dining",
      "insiderTip": "Dreams Fly expert advice"
    }
  ],
  "mustPackItems": ["Item 1", "Item 2", "Item 3"],
  "dreamsFlyPackageRecommendation": "Custom service recommendation from Dreams Fly International"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({ success: true, plan: parsedData });
  } catch (error: any) {
    console.error("AI Travel Planner Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate AI itinerary. Please try again."
    });
  }
});

// AI Visa Advisor Endpoint
app.post("/api/gemini/visa-advisor", async (req, res) => {
  try {
    const { targetCountry, citizenship, occupation, bankBalanceBDT, travelHistory, purpose } = req.body;

    const ai = getAiClient();
    const prompt = `Act as an expert Visa Officer at Dreams Fly International (BD Govt Reg Visa Consultancy).
Evaluate the visa eligibility for:
Target Country: ${targetCountry}
Applicant Citizenship: ${citizenship || 'Bangladesh'}
Occupation: ${occupation}
Approx Bank Balance (BDT): ৳${bankBalanceBDT || '1,000,000'}
Travel History: ${travelHistory || 'None / First Time Abroad'}
Purpose: ${purpose || 'Tourist Visit'}

Provide a comprehensive JSON response:
{
  "eligibilityScorePercent": number (0-100),
  "statusCategory": "High Approval Chance" | "Moderate Approval Chance" | "Requires Stronger Preparation",
  "keyStrengths": ["Strength 1", "Strength 2"],
  "riskFactors": ["Risk 1", "Risk 2"],
  "actionableSteps": ["Step 1", "Step 2", "Step 3"],
  "recommendedDocuments": ["Doc 1", "Doc 2", "Doc 3", "Doc 4"],
  "dreamsFlyAssistanceNote": "How Dreams Fly International guarantees 100% file preparation accuracy"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const assessment = JSON.parse(response.text || "{}");
    res.json({ success: true, assessment });
  } catch (error: any) {
    console.error("Visa Advisor Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze visa eligibility."
    });
  }
});

// Submit Inquiry or Booking (Dispatches Email Notification to smmbuy2022@gmail.com)
app.post("/api/inquiry/submit", async (req, res) => {
  const { type, name, fullName, phone, email, service, country, notes } = req.body;
  const inquiryId = `DF-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const displayName = name || fullName || "Valued Customer";

  // Dispatch email notification asynchronously
  sendNotificationEmail({ inquiryId, ...req.body }).catch((err) => {
    console.error("Async email dispatch error:", err);
  });

  res.json({
    success: true,
    inquiryId,
    applicationId: inquiryId,
    message: `Thank you ${displayName}! Your ${type || "inquiry"} has been received. Our senior consultant will reach out at ${phone || email} within 15 minutes.`,
    details: { inquiryId, service, country, createdAt: new Date().toISOString() }
  });
});

async function startServer() {
  let viteDevServer: ViteDevServer | null = null;

  if (process.env.NODE_ENV !== "production") {
    viteDevServer = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(viteDevServer.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, {
      index: false,
      setHeaders: (res, filepath) => {
        if (filepath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        } else if (filepath.includes('/assets/') || filepath.match(/\.[a-f0-9]{8,}\./i)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=86400');
        }
      }
    }));
  }

  // SSR HTML Handler for 100% SEO, Googlebot/Bingbot indexability & Social Sharing
  app.get("*", async (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.includes(".")) {
      return next();
    }
    try {
      let rawHtml = "";
      if (process.env.NODE_ENV !== "production" && viteDevServer) {
        const indexPath = path.join(process.cwd(), "index.html");
        if (fs.existsSync(indexPath)) {
          rawHtml = fs.readFileSync(indexPath, "utf-8");
          rawHtml = await viteDevServer.transformIndexHtml(req.originalUrl, rawHtml);
        }
      } else {
        const routeSpecificHtmlPath = path.join(process.cwd(), "dist", req.path.replace(/^\//, ""), "index.html");
        const distIndexPath = path.join(process.cwd(), "dist", "index.html");

        if (fs.existsSync(routeSpecificHtmlPath)) {
          rawHtml = fs.readFileSync(routeSpecificHtmlPath, "utf-8");
        } else if (fs.existsSync(distIndexPath)) {
          rawHtml = fs.readFileSync(distIndexPath, "utf-8");
        }
      }

      if (rawHtml) {
        const seoHtml = injectSeoIntoHtml(rawHtml, req.path);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(200).send(seoHtml);
      }
    } catch (err) {
      console.error("Error serving SEO HTML:", err);
    }
    next();
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dreams Fly International Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
