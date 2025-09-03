import React from "react";
import Image from "next/image";
import { Separator } from "./ui/separator";

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

      {imageUrl && (
        <div className="my-2">
          <Image
            src={imageUrl}
            alt={`${name}'s post image`}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      )}

      <p>{msg}</p>

      <Separator orientation="horizontal" />
    </div>
  );
};

export default Post;
