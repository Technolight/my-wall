"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

interface ImageDropAreaProps {
  className?: string;
}

export function ImageDropArea({ className }: ImageDropAreaProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition",
        isDragActive
          ? "border-primary bg-muted/50"
          : "border-muted-foreground/25",
        className // ✅ merge custom size classes
      )}
    >
      <input {...getInputProps()} />
      <p className="text-sm text-muted-foreground text-center px-2">
        {isDragActive
          ? "Drop the image here..."
          : "Drag & drop an image here, or click to select"}
      </p>
    </div>
  );
}
