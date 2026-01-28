import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

// Get the Gemini 1.5 Flash model for speed and cost efficiency
export function getGeminiModel(): GenerativeModel {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.1, // Low temperature for deterministic extraction
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1024,
    },
  });
}

// System instruction for invoice parsing
export const INVOICE_PARSING_PROMPT = `You are an expert invoice data extraction system. Your task is to analyze the provided invoice image and extract specific data fields.

INSTRUCTIONS:
1. Carefully examine the entire invoice image
2. Extract the following fields with precision:
   - Vendor Name: The company or business that issued the invoice
   - Invoice Date: The date the invoice was issued (format: YYYY-MM-DD)
   - Total Amount: The final total amount due (numeric value only, no currency symbols)
   - Currency: The currency code (e.g., USD, EUR, GBP, CNY, JPY)

RULES:
- If a field cannot be found or is unclear, use null
- For dates, always convert to YYYY-MM-DD format
- For amounts, extract only the numeric value without thousand separators
- For currency, use standard 3-letter ISO currency codes
- Do NOT include any explanations or additional text

OUTPUT FORMAT:
Return ONLY a valid JSON object with exactly these keys:
{
  "vendor": "string or null",
  "date": "YYYY-MM-DD or null",
  "amount": "number as string or null",
  "currency": "string or null"
}`;

// Type for the parsed invoice data
export interface ParsedInvoiceData {
  vendor: string | null;
  date: string | null;
  amount: string | null;
  currency: string | null;
}

// Parse the response from Gemini to extract JSON
export function parseGeminiResponse(response: string): ParsedInvoiceData {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        vendor: parsed.vendor || null,
        date: parsed.date || null,
        amount: parsed.amount?.toString() || null,
        currency: parsed.currency || null,
      };
    }
    throw new Error("No JSON found in response");
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return {
      vendor: null,
      date: null,
      amount: null,
      currency: null,
    };
  }
}

// Convert file to base64 for Gemini Vision
export async function fileToBase64(file: Buffer): Promise<string> {
  return file.toString("base64");
}

// Get MIME type from file extension
export function getMimeType(
  filename: string
): "image/png" | "image/jpeg" | "application/pdf" {
  const ext = filename.toLowerCase().split(".").pop();
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "pdf":
      return "application/pdf";
    default:
      return "image/jpeg";
  }
}
