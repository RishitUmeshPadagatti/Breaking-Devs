# WARP — AI Website Builder

An AI-powered website builder that generates, edits, and runs full-stack web applications directly in the browser from natural language prompts.

## Features

- **Prompt to App**: Generate complete React or Node.js projects from natural language descriptions.
- **In-Browser Execution**: Run and preview code live using WebContainers — no local server setup required for generated apps.
- **Interactive Code Editor**: Integrated Monaco editor with an interactive file explorer to view and modify generated files in real time.
- **Iterative Refinement**: Follow-up chat interface to continuously update and refine generated code.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Monaco Editor, WebContainer API
- **Backend**: Node.js, Express, TypeScript, Anthropic Claude SDK, OpenAI SDK

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm / yarn / pnpm
- Anthropic API key (or OpenAI API key)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
# Optional: OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend server (runs on `http://localhost:3000`):

```bash
npm run dev
```

### 2. Frontend Setup

In a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.