"use client";

import { useState } from "react";
import NextImage, { ImageProps } from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export const ImageWithSkeleton = ({ className, ...props }: ImageProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {loading && <Skeleton className="absolute inset-0 h-full w-full" />}
      <NextImage
        {...props}
        className={`transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        } ${className || ""}`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};
