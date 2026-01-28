import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Database types
export interface Invoice {
  id: string;
  user_id: string;
  file_url: string;
  vendor: string | null;
  amount: number | null;
  currency: string | null;
  date: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      invoices: {
        Row: Invoice;
        Insert: Omit<Invoice, "id" | "created_at">;
        Update: Partial<Omit<Invoice, "id" | "created_at">>;
      };
    };
  };
}

// Create Supabase client for server-side operations
export function createServerSupabaseClient(): SupabaseClient<Database> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Create Supabase client for client-side operations
export function createBrowserSupabaseClient(): SupabaseClient<Database> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Upload file to Supabase Storage
export async function uploadInvoiceFile(
  supabase: SupabaseClient<Database>,
  file: File,
  userId: string
): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("invoices")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("invoices").getPublicUrl(data.path);

  return publicUrl;
}

// Save invoice record to database
export async function saveInvoiceRecord(
  supabase: SupabaseClient<Database>,
  invoice: Omit<Invoice, "id" | "created_at">
): Promise<Invoice> {
  const { data, error } = await supabase
    .from("invoices")
    .insert(invoice)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save invoice: ${error.message}`);
  }

  return data;
}

// Get user's invoice history
export async function getUserInvoices(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch invoices: ${error.message}`);
  }

  return data || [];
}
