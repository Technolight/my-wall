"use client";

import React from "react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageWithSkeleton } from "@/components/skeletonImage";

type Props = {
  name: string;
  msg: string;
  elapsedTime: string;
  imageUrl?: string; // optional image
};

const Post = ({ name, msg, elapsedTime, imageUrl }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{name}</h2>
        <span className="text-sm text-muted-foreground">{elapsedTime}</span>
      </div>
      <p>{msg}</p>
      {imageUrl && (
        <div className="relative w-full max-w-md rounded-lg overflow-hidden">
          <ImageWithSkeleton
            src={imageUrl}
            alt="Post image"
            width={800}
            height={0}
            className="h-auto w-full object-contain"
          />
        </div>
      )}

      <Separator orientation="horizontal" />
    </div>
  );
};

const PostSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-4 w-10 rounded" />
      </div>

      <Skeleton className="h-16 w-full rounded" />

      <Skeleton className="h-60 w-full max-w-md rounded-lg" />

      <Separator orientation="horizontal" />
    </div>
  );
};

export default Post;
export { PostSkeleton };
