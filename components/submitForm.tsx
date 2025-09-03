"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ImageDropArea } from "@/components/ui/dropzone";

const MAX_CHARS = 280;

const SubmitForm = () => {
  const [text, setText] = useState("");
  const charRemaining = MAX_CHARS - text.length;

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="What's on your mind?"
        className="h-40 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={MAX_CHARS}
      />

      <p
        className={`text-sm mb-3 ${
          charRemaining <= 19 ? "text-red-500" : "text-muted-foreground"
        }`}
      >
        {charRemaining} characters remaining
      </p>

      <ImageDropArea className="h-40 w-full" />
    </div>
  );
};

export default SubmitForm;
