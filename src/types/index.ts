// Parsed invoice data from Gemini
export interface ParsedInvoiceData {
  vendor: string | null;
  date: string | null;
  amount: string | null;
  currency: string | null;
}

// API response types
export interface ParseInvoiceResponse {
  success: boolean;
  data?: ParsedInvoiceData;
  error?: string;
}

// Upload state types
export type UploadState = "idle" | "uploading" | "analyzing" | "success" | "error";

// Invoice record for database
export interface InvoiceRecord {
  id: string;
  user_id: string;
  file_url: string;
  vendor: string | null;
  amount: number | null;
  currency: string | null;
  date: string | null;
  created_at: string;
}

// File with preview
export interface FileWithPreview extends File {
  preview?: string;
}

// Form state for invoice upload
export interface InvoiceUploadState {
  file: FileWithPreview | null;
  uploadState: UploadState;
  parsedData: ParsedInvoiceData | null;
  error: string | null;
}
