# VectraLogic - Industrial Invoice Parser

![VectraLogic](https://i.postimg.cc/63KzWQny/IMG-8579.png)

**Precision Structure for Complex Data Operations**

VectraLogic is an AI-powered B2B SaaS solution designed to transform complex freight invoices into structured, actionable data. Built specifically for import/export operations, it delivers enterprise-grade accuracy with sub-5-second processing times.

## Features

- **AI-Powered Extraction** - Google Gemini Vision analyzes invoices with human-level accuracy
- **Sub-5 Second Processing** - Optimized pipeline delivers extracted data instantly
- **Structured Output** - Clean JSON and Excel exports ready for your ERP systems
- **Bank-Level Security** - End-to-end encryption with SOC 2 compliance ready
- **Multi-Currency Support** - Automatic detection of 150+ currencies
- **Any Format Accepted** - Process PNG, JPG, and PDF invoices

## Tech Stack

- **Framework:** Next.js 14+ (App Router, Server Actions)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS (Dark Mode, Glassmorphism)
- **Backend/Auth:** Supabase
- **AI Engine:** Google Gemini API (gemini-1.5-flash)
- **Libraries:** xlsx, lucide-react, react-dropzone

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account
- Google Cloud account (for Gemini API)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vectralogic.git
cd vectralogic
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
```

4. Run the database schema:
```sql
-- Run supabase-schema.sql in your Supabase SQL Editor
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/parse/        # API route for invoice parsing
│   │   ├── dashboard/        # Dashboard page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── components/
│   │   ├── DropZone.tsx      # File upload component
│   │   ├── Header.tsx        # Dashboard header
│   │   ├── LoadingState.tsx  # Loading animations
│   │   ├── Navbar.tsx        # Landing page navbar
│   │   └── ResultsTable.tsx  # Extracted data display
│   ├── lib/
│   │   ├── excel.ts          # Excel export utilities
│   │   ├── gemini.ts         # Gemini AI helper
│   │   └── supabase.ts       # Supabase client
│   └── types/
│       └── index.ts          # TypeScript interfaces
├── supabase-schema.sql       # Database schema
├── tailwind.config.ts        # Tailwind configuration
└── next.config.ts            # Next.js configuration
```

## Design System

- **Background:** Deep Midnight Blue (`#0B1120`)
- **Primary Accent:** Luminous Teal (`#06B6D4`)
- **Fonts:** Inter (Body), Space Grotesk (Headings)
- **Style:** Glassmorphism with subtle grid patterns

## API Usage

### Parse Invoice

```bash
POST /api/parse
Content-Type: multipart/form-data

file: <invoice_file>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "vendor": "Maersk Line",
    "date": "2024-01-15",
    "amount": "12450.00",
    "currency": "USD"
  }
}
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_GEMINI_API_KEY` | Google Gemini API key |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with precision for complex data operations.
