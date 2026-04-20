"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useChatStore } from "@/lib/chat-store";
import { FixedSizeList as List } from "react-window";
import { format } from "date-fns";

export default function ChatPage() {
  const messages = useChatStore((state) => state.messages);
  const router = useRouter();
  const [windowHeight, setWindowHeight] = useState(800);
  const [analysisStatus, setAnalysisStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [analysisResult, setAnalysisResult] = useState<{
    sentiment: string;
    summary: string;
    topics: string;
  } | null>(null);
  const [analysisCount, setAnalysisCount] = useState(0);

  useEffect(() => {
    if (messages.length === 0) {
      router.push("/upload");
    }
  }, [messages, router]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { participants, dateRange, messageCounts } = useMemo(() => {
    const participantsSet = new Set<string>();
    let earliest = messages[0]?.timestamp || new Date();
    let latest = messages[messages.length - 1]?.timestamp || new Date();
    const counts: Record<string, number> = {};

    messages.forEach((msg) => {
      if (msg.type !== "system") {
        participantsSet.add(msg.sender);
        counts[msg.sender] = (counts[msg.sender] || 0) + 1;
      }
      if (msg.timestamp < earliest) earliest = msg.timestamp;
      if (msg.timestamp > latest) latest = msg.timestamp;
    });

    return {
      participants: Array.from(participantsSet),
      dateRange: { start: earliest, end: latest },
      messageCounts: counts,
    };
  }, [messages]);

  const primaryUser = participants.length > 0 ? participants[0] : "";

  const handleRunAnalysis = async () => {
    if (messages.length === 0 || analysisCount >= 2) return;

    setAnalysisStatus("loading");
    setAnalysisCount((prev) => prev + 1);

    try {
      // Build a simplified string for the API to save tokens
      const conversationText = messages
        .filter((m) => m.type === "text")
        .slice(-1000) // limit to recent messages to avoid token overflow
        .map((m) => `${m.sender}: ${m.content}`)
        .join("\n");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: conversationText }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze");
      }

      const data = await response.json();
      setAnalysisResult(data);
      setAnalysisStatus("success");
    } catch (error) {
      console.error(error);
      setAnalysisStatus("error");
    }
  };

  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const msg = messages[index];
    const isPrimary = msg.sender === primaryUser;

    if (msg.type === "system") {
      return (
        <div style={style} className="flex justify-center items-center px-4">
          <div className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full text-center max-w-[80%]">
            {msg.content}
          </div>
        </div>
      );
    }

    return (
      <div
        style={style}
        className={`flex px-4 ${isPrimary ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[70%] p-3 rounded-lg ${
            isPrimary
              ? "bg-retro-green text-black rounded-tr-none border-2 border-black window-shadow"
              : "bg-white text-black rounded-tl-none border-2 border-black window-shadow"
          } flex flex-col`}
        >
          {!isPrimary && (
            <span className="text-xs font-bold mb-1 opacity-70">
              {msg.sender}
            </span>
          )}
          <span className="text-sm whitespace-pre-wrap">{msg.content}</span>
        </div>
      </div>
    );
  };

  if (messages.length === 0) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-4 md:p-8 gap-6 max-w-7xl mx-auto">
      {/* Sidebar Nav */}
      <nav className="w-full md:w-20 flex flex-row md:flex-col gap-4 bg-white dark:bg-slate-900 brutalist-border p-3 z-10 shrink-0 h-fit">
        <Link href="/">
          <button className="w-12 h-12 flex items-center justify-center bg-retro-yellow brutalist-border hover:translate-y-1 transition-transform">
            <span className="material-icons text-black">home</span>
          </button>
        </Link>
        <Link href="/upload">
          <button className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 brutalist-border hover:translate-y-1 transition-transform">
            <span className="material-icons text-black dark:text-white">
              upload
            </span>
          </button>
        </Link>
      </nav>

      {/* Main Chat View */}
      <div className="flex-1 bg-white dark:bg-slate-800 brutalist-border flex flex-col overflow-hidden h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
        <div className="window-header px-4 py-3 bg-retro-blue flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase text-black">
            Chat_Viewer.exe
          </span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
            <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
            <div className="w-3 h-3 rounded-full border-2 border-black bg-retro-pink"></div>
          </div>
        </div>
        <div className="flex-1 bg-slate-50 dark:bg-slate-900 py-4">
          <List
            height={windowHeight - 150} // Approximate available height
            itemCount={messages.length}
            itemSize={100} // Approximate message height
            width="100%"
          >
            {renderRow}
          </List>
        </div>
      </div>

      {/* Sidebar Panels */}
      <div className="w-full md:w-80 flex flex-col gap-6 shrink-0 h-full overflow-y-auto pb-8">
        {/* Metadata Panel */}
        <div className="bg-white dark:bg-slate-800 brutalist-border p-4">
          <h3 className="font-bold text-lg mb-4 border-b-2 border-black pb-2">
            Metadata
          </h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span className="opacity-70">Total Messages:</span>
              <span className="font-bold">{messages.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Participants:</span>
              <span className="font-bold">{participants.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="opacity-70">Date Range:</span>
              <span className="font-bold text-xs">
                {format(dateRange.start, "MMM d, yyyy")} -{" "}
                {format(dateRange.end, "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>

        {/* Analysis Panel Placeholder */}
        <div className="bg-retro-lavender brutalist-border p-4 flex flex-col gap-4">
          <h3 className="font-bold text-lg border-b-2 border-black pb-2 flex items-center gap-2">
            <span className="material-icons">psychology</span>
            AI Analysis
          </h3>

          <div className="bg-white p-3 border-2 border-black window-shadow text-sm">
            <h4 className="font-bold mb-1">Sentiment Overview</h4>
            <p className="text-gray-600 text-xs">
              {analysisStatus === "loading"
                ? "Analyzing..."
                : analysisResult?.sentiment ||
                  "AI analysis will display overall emotional tone here."}
            </p>
          </div>

          <div className="bg-white p-3 border-2 border-black window-shadow text-sm">
            <h4 className="font-bold mb-1">Conversation Summary</h4>
            <p className="text-gray-600 text-xs">
              {analysisStatus === "loading"
                ? "Analyzing..."
                : analysisResult?.summary ||
                  "AI will generate a brief summary of main topics discussed."}
            </p>
          </div>

          <div className="bg-white p-3 border-2 border-black window-shadow text-sm">
            <h4 className="font-bold mb-1">Topic Distribution</h4>
            <p className="text-gray-600 text-xs">
              {analysisStatus === "loading"
                ? "Analyzing..."
                : analysisResult?.topics ||
                  "Breakdown of frequently mentioned subjects."}
            </p>
          </div>

          {analysisStatus === "error" && (
            <p className="text-red-500 text-xs font-bold">
              Analysis failed. Check your API key.
            </p>
          )}

          <button
            onClick={handleRunAnalysis}
            disabled={analysisStatus === "loading" || analysisCount >= 2}
            className="bg-primary text-white font-bold p-2 brutalist-border mt-2 hover:bg-primary-dark transition-colors text-sm disabled:opacity-50"
          >
            {analysisStatus === "loading"
              ? "Analyzing..."
              : analysisCount >= 2
                ? "Analysis Limit Reached"
                : `Run Analysis (${2 - analysisCount} left)`}
          </button>
        </div>
      </div>
    </div>
  );
}
