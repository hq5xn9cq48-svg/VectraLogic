import { NextRequest, NextResponse } from "next/server";
import {
  getGeminiModel,
  INVOICE_PARSING_PROMPT,
  parseGeminiResponse,
  fileToBase64,
  getMimeType,
  ParsedInvoiceData,
} from "@/lib/gemini";

export const maxDuration = 30; // 30 second timeout for parsing

interface ParseResponse {
  success: boolean;
  data?: ParsedInvoiceData;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ParseResponse>> {
  try {
    // Check for API key
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "Google Gemini API key not configured",
        },
        { status: 500 }
      );
    }

    // Get the form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file provided",
        },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Please upload PNG, JPG, or PDF files.",
        },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: "File too large. Maximum size is 10MB.",
        },
        { status: 400 }
      );
    }

    // Convert file to buffer and then base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = await fileToBase64(buffer);

    // Get the MIME type
    const mimeType = getMimeType(file.name);

    // Initialize Gemini model
    const model = getGeminiModel();

    // Create the image part for Gemini
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };

    // Generate content with the invoice image
    const result = await model.generateContent([
      INVOICE_PARSING_PROMPT,
      imagePart,
    ]);

    const response = await result.response;
    const text = response.text();

    // Parse the response
    const parsedData = parseGeminiResponse(text);

    // Validate that we got at least some data
    const hasData = Object.values(parsedData).some((v) => v !== null);

    if (!hasData) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not extract invoice data. Please ensure the image is clear and contains invoice information.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    console.error("Invoice parsing error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        success: false,
        error: `Failed to parse invoice: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse<ParseResponse>> {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed. Use POST with FormData.",
    },
    { status: 405 }
  );
}
