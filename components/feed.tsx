"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Post, { PostSkeleton } from "@/components/post";

type PostRow = {
  id: string;
  body: string;
  created_at: string;
  image_url?: string;
};

const Feed = () => {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  //updates time stamps automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setPosts((prev) => [...prev]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading posts:", error);
        } else if (data) {
          setPosts(data as PostRow[]);
        }
      } catch (err) {
        console.error("Unexpected error loading posts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    const channel = supabase
      .channel("realtime-posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          console.log("New post received:", payload.new);
          setPosts((prev) => [payload.new as PostRow, ...prev]);
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  //converting time into simple timestamps
  const formatElapsedTime = (createdAt: string): string => {
    const now = new Date();
    const created = new Date(createdAt);
    const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

    if (diff < 60) return "now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo`;
    return `${Math.floor(diff / 31536000)}y`;
  };

  return (
    <div className="space-y-4">
      {loading
        ? Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />) // show 3 skeletons
        : posts.map((post) => (
            <Post
              key={post.id}
              name="Gabriel P. Torres"
              msg={post.body}
              elapsedTime={formatElapsedTime(post.created_at)}
              imageUrl={post.image_url}
            />
          ))}
    </div>
  );
};

export default Feed;
