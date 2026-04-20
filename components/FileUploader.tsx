"use client";

import { useState } from "react";

export default function FileUploader({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`border-4 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer 
        ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary"
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-upload")?.click()}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        accept=".txt,image/png,image/jpeg"
      />
      <div className="w-20 h-20 bg-retro-lavender rounded-full flex items-center justify-center mb-6">
        <span className="material-icons text-4xl text-primary">
          cloud_upload
        </span>
      </div>
      <h3 className="text-xl font-bold font-display mb-2 text-black dark:text-white">
        Click or drag file to this area to upload
      </h3>
      <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-6">
        Support for .txt, .png, .jpg files
      </p>
      <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 font-mono font-bold uppercase hover:opacity-80 transition-opacity">
        Select File
      </button>
    </div>
  );
}
