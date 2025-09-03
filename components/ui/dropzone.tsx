"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { X } from "lucide-react"; // optional: a small "X" icon

interface ImageDropAreaProps {
  className?: string;
  onFileSelect: (file: File | null) => void;
}

export function ImageDropArea({ className, onFileSelect }: ImageDropAreaProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] ?? null;
      setImageFile(file);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  // Create preview URL
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const removeImage = () => {
    setImageFile(null);
    onFileSelect(null);
  };

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
            onClick={removeImage}
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
