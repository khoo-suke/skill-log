'use client';

import { useEffect, useState } from "react";
import styles from '@/app/mypage/_styles/Mypage.module.scss';
import { Post } from '@/app/mypage/_types/Post';
import Link from 'next/link';
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Wrapper from "../_components/Wrapper";

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
      <div className={styles.calendarArea}>
        <Wrapper size={800}>
          <div className={styles.flexBox}>
            <div className="calendar">
              <Calendar
                locale="ja-JP"
                />
            </div>
            <div className="studyTime">
              <h2>
                平均勉強時間
              </h2>
              <div className="">
                <Link href="">年</Link>/<Link href="">月</Link>/<Link href="">週</Link>
              </div>
              <div className="">
                <span>期間設定:</span>
              </div>
              <div className="">
                <p>一日あたり<strong>2.5h</strong></p>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <div className={styles.posts}>
        <div className={styles.cap}>
          <Wrapper size={1000}>
            <h2>
              投稿一覧
            </h2>
          </Wrapper>
        </div>
        <div className={styles.postArea}>
        <Wrapper size={800}>
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
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default Mypage;