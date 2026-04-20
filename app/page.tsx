import Link from "next/link";

export default function Home() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      {/* Floating Elements */}
      <div className="fixed top-20 left-20 text-retro-pink floating opacity-50 dark:opacity-30 pointer-events-none">
        <span className="material-icons text-6xl">favorite</span>
      </div>
      <div
        className="fixed bottom-40 right-20 text-retro-blue floating opacity-50 dark:opacity-30 pointer-events-none"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-16 h-16 border-4 border-current rotate-45"></div>
      </div>
      <div
        className="fixed top-1/2 right-10 text-retro-purple floating opacity-50 dark:opacity-30 pointer-events-none"
        style={{ animationDelay: "2s" }}
      >
        <span className="material-icons text-5xl">auto_awesome</span>
      </div>
      <div
        className="fixed bottom-10 left-40 text-retro-yellow floating opacity-50 dark:opacity-30 pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="w-12 h-12 bg-current rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl w-full">
        {/* Sidebar Navigation */}
        <div className="hidden lg:flex flex-col gap-4 mr-12 bg-white dark:bg-slate-800 p-3 border-4 border-black window-shadow">
          <button className="w-12 h-12 bg-retro-yellow flex items-center justify-center border-2 border-black hover:bg-yellow-300 transition-colors">
            <span className="material-icons text-black">home</span>
          </button>
          <button className="w-12 h-12 bg-white dark:bg-slate-700 flex items-center justify-center border-2 border-black hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors cursor-not-allowed opacity-50">
            <span className="material-icons text-black dark:text-white">
              history
            </span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          <div className="bg-white dark:bg-slate-800 border-4 border-black p-6 md:p-12 window-shadow relative overflow-hidden">
            {/* Window Controls */}
            <div className="absolute top-0 left-0 w-full h-8 bg-retro-purple border-b-4 border-black flex items-center justify-between px-2">
              <span className="text-xs font-bold font-mono text-white">
                CHAT_LENS.EXE
              </span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-white border border-black"></div>
                <div className="w-3 h-3 bg-white border border-black"></div>
                <div className="w-3 h-3 bg-retro-pink border border-black"></div>
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 z-10">
                <div className="inline-block bg-retro-yellow border-2 border-black px-3 py-1 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                  <span className="font-bold font-mono text-xs uppercase tracking-wider text-black">
                    v1.0.0 Public Beta
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight text-black dark:text-white">
                  CHAT <br />
                  <span className="text-primary italic">LENS</span>
                </h1>
                <p className="text-lg md:text-xl font-mono mb-8 text-gray-700 dark:text-gray-300 border-l-4 border-retro-pink pl-4">
                  Analyze your chat history.
                  <br />
                  Discover hidden sentiments.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/upload"
                    className="neobrutalism bg-retro-green text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-green-300 flex items-center justify-center gap-2"
                  >
                    <span className="material-icons">upload</span>
                    Start Analysis
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="neobrutalism bg-white dark:bg-slate-700 text-black dark:text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center justify-center gap-2"
                  >
                    <span className="material-icons">help_outline</span>
                    How it works
                  </Link>
                </div>
              </div>

              {/* Hero Image/Graphic */}
              <div className="flex-1 relative w-full h-64 md:h-80 border-4 border-black bg-retro-blue p-4 window-shadow transform rotate-2">
                <div className="absolute -top-6 -right-6 bg-white border-2 border-black px-3 py-1 z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="font-bold font-mono text-xs text-black">
                    AI_POWERED
                  </span>
                </div>
                <div className="w-full h-full bg-white border-2 border-black flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                  <div className="absolute inset-0 grid-pattern opacity-50"></div>
                  <div className="w-16 h-16 rounded-full bg-retro-pink border-2 border-black flex items-center justify-center z-10">
                    <span className="material-icons text-3xl text-black">
                      face
                    </span>
                  </div>
                  <div className="bg-gray-100 border-2 border-black p-2 rounded-lg max-w-[80%] z-10">
                    <p className="font-mono text-xs text-black">
                      "I'm actually fine, seriously..."
                    </p>
                  </div>
                  <div className="mt-2 text-center z-10">
                    <span className="bg-black text-white px-2 py-1 font-mono text-xs uppercase">
                      Sentiment: Passive Aggressive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
