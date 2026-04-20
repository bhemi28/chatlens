import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background-light dark:bg-background-dark grid-pattern">
      {/* Background Decorative Elements */}
      <div className="fixed top-10 right-20 w-16 h-16 bg-retro-yellow border-4 border-black rotate-12 hidden lg:block pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-20 h-20 bg-retro-purple opacity-30 rounded-full hidden lg:block pointer-events-none"></div>

      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-6 items-start relative">
        {/* Sidebar Nav */}
        <nav className="w-full md:w-20 flex flex-row md:flex-col gap-4 bg-white dark:bg-slate-900 brutalist-border p-3 z-10 shrink-0">
          <Link href="/">
            <button className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 brutalist-border hover:translate-y-1 transition-transform">
              <span className="material-icons text-black dark:text-white">
                home
              </span>
            </button>
          </Link>
          <Link href="/upload">
            <button className="w-12 h-12 flex items-center justify-center bg-retro-yellow brutalist-border hover:translate-y-1 transition-transform">
              <span className="material-icons text-black">upload</span>
            </button>
          </Link>
        </nav>

        {/* Main Content Window */}
        <main className="flex-1 bg-white dark:bg-slate-800 brutalist-border overflow-hidden w-full window-shadow">
          {/* Window Header */}
          <div className="window-header flex items-center justify-between px-4 py-3 bg-retro-green">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm text-black">
                help_outline
              </span>
              <span className="font-mono text-xs font-bold tracking-wider uppercase text-black">
                README.TXT
              </span>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
              <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
              <div className="w-3 h-3 rounded-full border-2 border-black bg-retro-pink"></div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="inline-block bg-black text-white px-3 py-1 mb-6 font-mono text-sm uppercase font-bold transform -rotate-1">
              Instructions
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-black dark:text-white leading-tight">
              How <span className="text-primary italic">ChatLens</span> Works
            </h1>

            <div className="space-y-8 font-mono text-sm md:text-base text-gray-800 dark:text-gray-300">
              {/* Step 1 */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-retro-yellow border-2 border-black flex items-center justify-center shrink-0 font-bold text-xl text-black">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-display">
                    Export or Capture
                  </h3>
                  <p className="leading-relaxed">
                    ChatLens accepts two types of inputs. You can export a chat
                    log from WhatsApp as a standard <code>.txt</code> file
                    without media. Alternatively, if you want to analyze a
                    shorter interaction, simply take a screenshot (
                    <code>.png</code> or <code>.jpg</code>) of the conversation.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-retro-pink border-2 border-black flex items-center justify-center shrink-0 font-bold text-xl text-black">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-display">
                    Local & Secure Upload
                  </h3>
                  <p className="leading-relaxed">
                    Upload your file to our processing engine. If you upload a{" "}
                    <code>.txt</code> file, your data is processed entirely
                    locally within your browser. If you upload an image, it is
                    securely transmitted to our AI vision model to transcribe
                    the text into a readable format.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-retro-blue border-2 border-black flex items-center justify-center shrink-0 font-bold text-xl text-black">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-display">
                    Review and Analyze
                  </h3>
                  <p className="leading-relaxed mb-4">
                    Once parsed, your conversation is reconstructed into a
                    familiar, scrollable interface. From there, you can click
                    "Run Analysis" to query the Gemini AI.
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-700 p-4 border-l-4 border-primary">
                    <p className="font-bold text-black dark:text-white mb-1">
                      What the AI looks for:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Sentiment:</strong> The overall emotional tone
                        (e.g., passive-aggressive, joyful, urgent).
                      </li>
                      <li>
                        <strong>Summary:</strong> A concise recap of the core
                        topics discussed.
                      </li>
                      <li>
                        <strong>Topics:</strong> The primary subjects or
                        keywords of the interaction.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t-4 border-black dark:border-slate-700">
              <Link
                href="/upload"
                className="neobrutalism inline-flex items-center justify-center bg-primary text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors gap-2 w-full md:w-auto"
              >
                <span className="material-icons">rocket_launch</span>
                Ready? Start Now
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
