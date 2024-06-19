'use client';

import { useEffect, useState } from "react";
import styles from '@/app/mypage/_styles/Mypage.module.scss';
import { Post } from '@/app/mypage/_types/Post';
import Link from 'next/link';
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = 'https://your-supabase-url.supabase.co';
// const supabaseKey = 'your-anon-key';
// const supabase = createClient(supabaseUrl, supabaseKey);

const Mypage = () => {
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
      });

      const { posts } = await res.json();
      setPosts([...posts]);
    }

    fetcher();
  }, [token]);

  return (
    <>
      <div>
      <div className="calendar">
        <Calendar
          locale="ja-JP"
          />
      </div>
      </div>
      <div className={styles.posts}>
        <div>{/* wrapper--800 card */}
          {posts.map((post) => (
            <div className={styles.home_container} key={post.id}>
              <ul>
                <li>
                  <Link href={`/mypage/posts/${post.id}`}>
                    <div>
                      <h2>{post.title}</h2>
                      <div>
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
                    </div>
                    <p>{post.content}</p>
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Mypage;