'use client';

import { useEffect, useState } from "react";
import styles from './_styles/ListPost.module.scss';
import { Post } from './_components/Post/Post';
import Link from 'next/link';

export default function ListPost() {
  const [posts, setPosts] = useState<Post[]>([]);

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
      {posts.map((post) => (
        <div className={styles.home_container} key={post.id}>
          <ul>
            <li>
              <Link href={`/mypage/posts/${post.id}`}>
                <div>
                  <h2>{post.title}</h2>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <div className={styles.home_categories}>
                    {post.postCategories.map(category => (
                      <p key={category.category.id}>{category.category.name}</p>
                    ))}
                  </div>
                  <div className={styles.home_tags}>
                    {post.postTags.map(tag => (
                      <p key={tag.tag.id}>{tag.tag.name}</p>
                    ))}
                  </div>
                </div>
                <p>{post.content}</p>
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}