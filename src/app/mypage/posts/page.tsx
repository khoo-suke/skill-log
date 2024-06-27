"use client";

import { useEffect, useState } from 'react';
import styles from '@/app/_styles/Mypage.module.scss';
import Link from 'next/link';
import { Post } from '@/app/mypage/_types/Post';
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function ListPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;
    const fetcher = async () => {
      const res = await fetch('/api/posts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      const { posts } = await res.json()
      setPosts([...posts])
    }

    fetcher()
  }, [token]);

  return (
    <>

    </>
  );
}