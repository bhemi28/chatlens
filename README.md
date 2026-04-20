# Chat Sentiment & Vibe Analyzer

## Project Overview

**Chat Sentiment & Vibe Analyzer** is a research-oriented tool designed to analyze conversations and determine their emotional tone, mood, and general vibe.

## Project Status: Early Development / Setup Phase

This project is currently in the early development stage, intended for the end-semester project review.

### What Works
- **Next.js 14 App Router** structure is initialized.
- **Neo-Brutalist / Retro UI** foundation is implemented.
- **File Upload Interface** allows users to select Text (.txt) and Image (.png/.jpg) files.
- **File Preview** displays basic information about the uploaded file.
- **Responsive Design** for desktop and mobile.

### What is Pending
- **Backend Logic**: The API routes are currently placeholders.
- **AI Integration**: Google Gemini API integration for sentiment and vibe analysis is **NOT** yet implemented.
- **Data Persistence**: No database is connected; `useState` is used for temporary frontend state.

## Backend Setup

The backend logic is located in `app/api/upload/route.ts`. It is currently a placeholder returning a mock response.

```typescript
// TODO: Integrate Gemini for sentiment & vibe analysis here
```

## Future Roadmap

1.  Integrate **Google Gemini API** to process text and image inputs.
2.  Implement detailed **Sentiment Analysis** (Positive, Negative, Neutral).
3.  Add **Vibe Check** (e.g., Chill, Professional, Aggressive, Flirty).
4.  Visualize analysis results with charts and graphs.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Design System**: Retro/Neo-Brutalist

## How to Run

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) with your browser.
