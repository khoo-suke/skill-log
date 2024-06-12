"use client";

import { useEffect, useState } from "react";
import styles from '../_styles/ListPost.module.scss';
import Link from 'next/link';

export default function ListPost() {
  const [posts, setPosts] = useState<[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/posts')
      const { posts } = await res.json()
      setPosts(posts)
    }

    fetcher()
  }, []);

  return (
    <>
      {posts.map(() => (
        <div className={styles.home_container}>
          <ul>
            <li>

            </li>
          </ul>
        </div>
      ))}
    </>
  );
}