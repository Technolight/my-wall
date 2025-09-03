"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ImageDropArea } from "@/components/ui/dropzone";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";

const MAX_CHARS = 280;

const SubmitForm = () => {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const charRemaining = MAX_CHARS - text.length;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim() && !imageFile) return;

    setLoading(true);

    let imageUrl: string | null = null;

    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Image upload failed:", uploadError);
      } else {
        const { data } = supabase.storage
          .from("post-images")
          .getPublicUrl(fileName);
        imageUrl = data?.publicUrl ?? null;
      }
    }

    // Insert
    const { error } = await supabase.from("posts").insert({
      body: text,
      image_url: imageUrl, // never undefined
    });

    if (error) console.error("Error posting:", error);

    setText("");
    setImageFile(null);
    setLoading(false);
  };

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

      <ImageDropArea className="h-40 w-full" onFileSelect={setImageFile} />

      <Button
        onClick={handleSubmit}
        disabled={(!text && !imageFile) || charRemaining < 0 || loading}
      >
        Share
      </Button>
    </div>
  );
};

export default SubmitForm;
