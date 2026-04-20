"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FileUploader from "@/components/FileUploader";
import {
  SystemProgress,
  SystemSuccess,
  SystemError,
} from "@/components/SystemStatus";
import { parseWhatsAppChat } from "@/lib/parser";
import { useChatStore } from "@/lib/chat-store";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const setMessages = useChatStore((state) => state.setMessages);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setUploadStatus("idle");
  };

  const startAnalysis = async () => {
    if (!file) return;

    setUploadStatus("uploading");
    setProgress(0);

    // Image Upload Route
    if (file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("image", file);
      setProgress(30);

      try {
        const response = await fetch("/api/parse-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to parse image");
        }

        const messages = await response.json();
        setProgress(100);

        if (messages.length === 0) {
          setUploadStatus("error");
          return;
        }

        setMessages(messages);
        setUploadStatus("success");
        setTimeout(() => {
          router.push("/chat");
        }, 1500);
      } catch (error) {
        console.error("Image parsing error:", error);
        setUploadStatus("error");
      }
      return;
    }

    // Text Upload Route
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        setProgress(50);
        setTimeout(() => {
          const messages = parseWhatsAppChat(text);
          if (messages.length === 0) {
            setUploadStatus("error");
            return;
          }
          setMessages(messages);
          setProgress(100);
          setUploadStatus("success");
          setTimeout(() => {
            router.push("/chat");
          }, 1500);
        }, 500);
      } catch (error) {
        console.error("Parsing error:", error);
        setUploadStatus("error");
      }
    };

    reader.onerror = () => {
      setUploadStatus("error");
    };

    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      {/* Background Decorative Elements */}
      <div className="fixed top-10 left-10 w-12 h-12 bg-retro-pink opacity-20 rotate-12 hidden lg:block pointer-events-none"></div>
      <div className="fixed bottom-20 right-20 w-16 h-16 bg-retro-lavender opacity-20 rounded-full hidden lg:block pointer-events-none"></div>

      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-6 items-start relative">
        {/* Sidebar Nav */}
        <nav className="w-full md:w-20 flex flex-row md:flex-col gap-4 bg-white dark:bg-slate-900 brutalist-border p-3 z-10">
          <Link href="/">
            <button className="w-12 h-12 flex items-center justify-center bg-retro-yellow brutalist-border hover:translate-y-1 transition-transform">
              <span className="material-icons text-black">home</span>
            </button>
          </Link>

          <button
            className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 brutalist-border hover:translate-y-1 transition-transform cursor-not-allowed opacity-50"
            title="History (Coming Soon)"
          >
            <span className="material-icons text-black dark:text-white">
              history
            </span>
          </button>
        </nav>

        {/* Main Content Window */}
        <main className="flex-1 bg-white dark:bg-slate-900 brutalist-border overflow-hidden w-full">
          {/* Window Header */}
          <div className="window-header flex items-center justify-between px-4 py-3 bg-retro-lavender dark:bg-indigo-900">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm text-black dark:text-white">
                terminal
              </span>
              <span className="font-mono text-xs font-bold tracking-wider uppercase text-slate-800 dark:text-slate-100">
                Upload_System_v1.0.2.exe
              </span>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
              <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
              <div className="w-3 h-3 rounded-full border-2 border-black bg-retro-pink"></div>
            </div>
          </div>

          <div className="p-6 md:p-12">
            {!file ? (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-display font-bold mb-2 text-black dark:text-white">
                  Upload Conversation
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 font-mono text-sm max-w-lg">
                  Upload your chat logs to begin the analysis. We support text
                  files and screenshots.
                </p>
                <div className="bg-white dark:bg-slate-800 p-2 brutalist-border">
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>
                <div className="mt-8 flex gap-4 text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="material-icons text-sm">lock</span>
                    <span>End-to-end encrypted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-icons text-sm">bolt</span>
                    <span>Instant Analysis (Soon)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold text-black dark:text-white">
                    File Ready
                  </h2>
                  <button
                    onClick={() => {
                      setFile(null);
                      setUploadStatus("idle");
                    }}
                    className="text-sm font-mono text-retro-pink hover:underline uppercase"
                  >
                    Cancel / Remove
                  </button>
                </div>

                {uploadStatus === "idle" && (
                  <>
                    <div className="brutalist-border bg-slate-50 dark:bg-slate-800 p-6 flex gap-4 items-start relative overflow-hidden mb-8">
                      {/* Decorative background number */}
                      <span className="absolute -right-4 -bottom-8 text-9xl font-bold text-slate-200 dark:text-slate-700 opacity-50 z-0">
                        01
                      </span>

                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 border-2 border-black flex items-center justify-center shrink-0 z-10">
                        {file.type.startsWith("image") ? (
                          <span className="material-icons text-3xl text-blue-600 dark:text-blue-400">
                            image
                          </span>
                        ) : (
                          <span className="material-icons text-3xl text-blue-600 dark:text-blue-400">
                            description
                          </span>
                        )}
                      </div>
                      <div className="z-10">
                        <h3 className="font-bold text-lg font-mono text-black dark:text-white">
                          {file.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-2">
                          {(file.size / 1024).toFixed(2)} KB •{" "}
                          {file.type || "Unknown Type"}
                        </p>
                        <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 border border-green-800 font-bold uppercase">
                          Ready to Analyze
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={startAnalysis}
                        className="w-full bg-primary text-white p-4 brutalist-border hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 font-bold uppercase tracking-wider relative group"
                      >
                        <span className="material-icons group-hover:animate-bounce">
                          auto_awesome
                        </span>
                        Analyze Chat
                      </button>
                      <p className="mt-4 text-center text-xs font-mono text-gray-400">
                        * Backend integration is pending. Gemini API will be
                        connected here.
                      </p>
                    </div>
                  </>
                )}

                {uploadStatus === "uploading" && (
                  <SystemProgress
                    progress={progress}
                    status="Uploading to Secure Vault..."
                  />
                )}

                {uploadStatus === "success" && (
                  <SystemSuccess
                    title="SUCCESS: UPLOAD_COMPLETE"
                    message="File processed successfully. Redirecting to chat analysis..."
                    onViewReport={() => router.push("/chat")}
                    onDismiss={() => setUploadStatus("idle")}
                  />
                )}

                {uploadStatus === "error" && (
                  <SystemError
                    title="ERROR: PARSE_FAILED"
                    message="Unable to read chat log. Ensure it's a valid WhatsApp export or clear chat screenshot and try again."
                    onRetry={() => setUploadStatus("idle")}
                    onCancel={() => setFile(null)}
                  />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
