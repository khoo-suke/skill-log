"use client";

import { useEffect, useState, useCallback } from "react";
import { PostRequestBody } from "@/app/mypage/_types/PostRequestBody";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import "react-calendar/dist/Calendar.css";

export const useGetPost = () => {
  const [posts, setPosts] = useState<PostRequestBody[]>([]);
  const { token } = useSupabaseSession();

  // GET 記事用
  const fetchPosts = useCallback(async () => {
    if (!token) return;

    const response = await fetch("/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      const { posts } = await response.json();
      setPosts([...posts]);
    }
  }, [token]);

  // ステートが変更されるたびに更新する
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    setPosts,
    fetchPosts,
  };
};
