import React from "react";

interface SystemErrorProps {
  title: string;
  message: string;
  code?: string;
  onRetry?: () => void;
  onCancel?: () => void;
}

export const SystemError: React.FC<SystemErrorProps> = ({
  title,
  message,
  code = "0x000000",
  onRetry,
  onCancel,
}) => {
  return (
    <div className="brutalist-border bg-white dark:bg-slate-900 retro-shadow overflow-hidden max-w-md w-full">
      <div className="bg-primary text-white p-2 border-b-4 border-black dark:border-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-icons text-sm">error_outline</span>
          <span className="text-xs font-bold uppercase tracking-tight">
            System_Message.exe
          </span>
        </div>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-white dark:bg-slate-800 border border-black dark:border-white"></div>
          <div className="w-4 h-4 bg-retro-pink border border-black dark:border-white flex items-center justify-center text-[10px] text-black">
            X
          </div>
        </div>
      </div>
      <div className="p-8 flex flex-col items-center text-center">
        <div className="bg-retro-pink border-4 border-black p-4 mb-6 rotate-1">
          <span className="material-icons text-5xl text-black">
            priority_high
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold mb-2 text-black dark:text-white">
          {title}
        </h3>
        <p className="text-sm opacity-70 mb-8 max-w-xs font-mono text-black dark:text-white">
          {message}
        </p>
        <div className="flex gap-4 w-full">
          <button
            onClick={onRetry}
            className="flex-1 border-4 border-black bg-primary text-white py-3 font-bold hover:brightness-110 active:translate-y-1 transition-all uppercase"
          >
            Try_Again
          </button>
          <button
            onClick={onCancel}
            className="px-6 border-4 border-black bg-white dark:bg-slate-800 text-black dark:text-white py-3 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 uppercase"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 border-t-4 border-black dark:border-white p-2 text-[10px] flex justify-between uppercase opacity-60 font-mono text-black dark:text-white">
        <span>Code: {code}</span>
        <span>Stack: UI_UPLOAD_HANDLER</span>
      </div>
    </div>
  );
};

interface SystemSuccessProps {
  title: string;
  message: string;
  onViewReport: () => void;
  onDismiss: () => void;
}

export const SystemSuccess: React.FC<SystemSuccessProps> = ({
  title,
  message,
  onViewReport,
  onDismiss,
}) => {
  return (
    <div className="border-4 border-black bg-retro-green dark:bg-[#15803d] p-6 retro-shadow-lg transform -rotate-1 max-w-sm w-full">
      <div className="flex items-start gap-4">
        <div className="bg-black text-white p-2 h-fit">
          <span className="material-icons animate-pulse">check_circle</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1 leading-none uppercase text-black dark:text-white">
            {title}
          </h3>
          <p className="text-sm opacity-80 leading-snug font-mono text-black dark:text-white">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

interface SystemProgressProps {
  progress: number;
  status: string;
}

export const SystemProgress: React.FC<SystemProgressProps> = ({
  progress,
  status,
}) => {
  return (
    <div className="border-4 border-black bg-white dark:bg-slate-900 p-6 space-y-4 max-w-md w-full">
      <div className="flex justify-between items-end mb-2 text-black dark:text-white">
        <span className="text-xs font-bold uppercase">{status}</span>
        <span className="text-xs font-mono">{progress}%</span>
      </div>
      <div className="border-4 border-black h-8 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="absolute inset-0 flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-full w-full border-r border-black/10 dark:border-white/10"
            ></div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 text-black dark:text-white">
        <span className="text-[10px] animate-pulse">■</span>
        <span className="text-[10px] opacity-60 uppercase">Processing...</span>
      </div>
    </div>
  );
};
