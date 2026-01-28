import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 30;

interface ParsedData {
  vendor: string | null;
  date: string | null;
  amount: string | null;
  currency: string | null;
}

interface ApiResponse {
  success: boolean;
  data?: ParsedData;
  error?: string;
}

const PROMPT = `You are an invoice data extraction expert. Analyze this invoice image and extract:
1. Vendor Name - The company that issued the invoice
2. Invoice Date - Format as YYYY-MM-DD
3. Total Amount - Numeric value only, no currency symbols
4. Currency - 3-letter code (USD, EUR, etc.)

Return ONLY valid JSON:
{"vendor": "...", "date": "YYYY-MM-DD", "amount": "...", "currency": "..."}

Use null for any field you cannot find.`;

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "demo_key_replace_me") {
      // Return demo data for testing without API key
      return NextResponse.json({
        success: true,
        data: {
          vendor: "Demo Shipping Co.",
          date: "2024-01-15",
          amount: "2450.00",
          currency: "USD",
        },
      });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Use PNG, JPG, or PDF." },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File too large. Max 10MB." },
        { status: 400 }
      );
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Get MIME type
    const mimeType = file.type === "application/pdf" 
      ? "application/pdf" 
      : file.type as "image/png" | "image/jpeg";

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1024,
      },
    });

    // Send to Gemini
    const result = await model.generateContent([
      PROMPT,
      {
        inlineData: {
          data: base64,
          mimeType,
        },
      },
    ]);

    const text = result.response.text();
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { success: false, error: "Could not parse invoice data" },
        { status: 422 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]) as ParsedData;

    // Check if any data was extracted
    const hasData = Object.values(parsed).some(v => v !== null);
    if (!hasData) {
      return NextResponse.json(
        { success: false, error: "No data could be extracted from this invoice" },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        vendor: parsed.vendor || null,
        date: parsed.date || null,
        amount: parsed.amount?.toString() || null,
        currency: parsed.currency || null,
      },
    });

  } catch (error) {
    console.error("Parse error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Processing failed" 
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json(
    { success: false, error: "Use POST with FormData" },
    { status: 405 }
  );
}
