"use client";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ImageDropAreaProps {
  className?: string;
  file: File | null;
  onFileSelect: (file: File | null) => void;
}

export function ImageDropArea({
  className,
  file,
  onFileSelect,
}: ImageDropAreaProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onFileSelect(acceptedFiles[0] ?? null);
    },
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className={cn("relative", className)}>
      {previewUrl ? (
        <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground">
          <img
            src={previewUrl}
            alt="Preview"
            className="object-cover w-full h-full"
          />
          <button
            type="button"
            onClick={() => onFileSelect(null)}
            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition h-full",
            isDragActive
              ? "border-primary bg-muted/50"
              : "border-muted-foreground/25"
          )}
        >
          <input {...getInputProps()} />
          <p className="text-sm text-muted-foreground text-center px-2">
            {isDragActive
              ? "Drop the image here..."
              : "Drag & drop an image here, or click to select"}
          </p>
        </div>
      )}
    </div>
  );
}
