# Lumina

<div align="center">

**Modern AI-Powered Malware Detection Interface**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

Lumina Frontend is a modern, feature-rich web interface for the Lumina malware detection system. It provides an intuitive dashboard for uploading and analyzing Windows executable files using machine learning.

<img width="1794" height="3004" alt="Screenshot_6-6-2026_21357_localhost" src="https://github.com/user-attachments/assets/72ffd408-d135-418e-9c84-fe1b5aef00ce" />

## Features

- **File Analysis**: Upload and analyze Windows .exe files
- **Batch Processing**: Analyze up to 10 files simultaneously
- **Real-time Progress**: Visual analysis stages with animations
- **Results Dashboard**: Detailed verdicts with confidence scores
- **Export Reports**: Download results as JSON, CSV, or HTML
- **History Tracking**: Local storage of past analyses
- **Dark/Light Mode**: Theme support with smooth transitions
- **Responsive Design**: Works on desktop, tablet, and mobile

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Backend API running at `http://localhost:8000`

### Installation

```bash
# Clone the repository
git clone https://github.com/IFTE-13/lumina.git
cd lumina

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

Visit http://localhost:3000 to see the application.

### Environment Variables

#### Create .env.local file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/threat-detector` | Main malware analysis |
| `/dashboard` | Statistics dashboard |
| `/compare` | Compare multiple files |
| `/batch-reports` | Batch analysis history |
| `/threat-intelligence` | Threat insights |
| `/verify` | Verify analysis results |
| `/status` | System health |
| `/api-docs` | API reference |
| `/help` | Documentation & guides |
| `/about` | About Lumina |

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **File Upload**: React Dropzone
- **Animations**: Framer Motion
- **Theming**: next-themes

## Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Run production server
pnpm lint       # Run ESLint
pnpm type-check # Run TypeScript type checking
```

## Backend Integration
This frontend connects to the Lumina API backend. Make sure:

1. Backend is running at http://localhost:8000
2. CORS is enabled on the backend
3. The API endpoints are accessible

## Contributing
Fork the repository

- Create your feature branch (git checkout -b feature/amazing)
- Commit your changes (git commit -m 'Add amazing feature')
- Push to the branch (git push origin feature/amazing)

Open a Pull Request
