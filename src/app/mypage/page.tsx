'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/mypage/_styles/Mypage.module.scss';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import Link from 'next/link';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { Wrapper } from '../_components/Wrapper';
import { Tabs } from './_components/Tabs';


const Mypage = () => {
  const [posts, setPosts] = useState<PostRequestBody[]>([]);
  const { token } = useSupabaseSession();
  const [activeTab, setActiveTab] = useState('all'); 

  useEffect(() => {
    if (!token) return;
    
    const fetcher = async () => {
      const response = await fetch('/api/posts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const { posts } = await response.json();
      setPosts([...posts]);
    }

    fetcher();
  }, [token]);

    // activeTab に基づいて投稿をフィルタリングする
    const filteredPosts = posts.filter(post => {
      if (activeTab === 'all') {
        return true; // すべての投稿を表示
      } else if (activeTab === 'カテゴリー') {
        return post.postCategories.some(category => category.category.name === 'cate1'); // カテゴリー名に基づいてフィルタリング
      } else if (activeTab === 'タグ') {
        return post.postTags.some(tag => tag.tag.name === 'タグ名'); // タグ名に基づいてフィルタリング
      } else if (activeTab === '期間で絞る') {
        // 期間でのフィルタリングロジックを追加
        return true;
      }
      return true;
    });

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
            <Tabs
              tabs={['all', 'カテゴリー', 'タグ', '期間で絞る']}
              setActiveTab={setActiveTab}
            />
          </Wrapper>
        </div>
        <div className={styles.postArea}>
          <Wrapper size={800}>
            {/* ここにタグを追加 */}
          {filteredPosts.map((post) => (
            <div className={styles.home_container} key={post.id}>
              <ul>
                <li>
                  <Link href={`/mypage/posts/${post.id}`}>
                    <div className={styles.top}>
                      <h2>{post.title}</h2>
                      <div>
                        {post.postCategories.map(category => (
                        <div className={styles.home_categories}>
                          <p key={category.category.id}>{category.category.name}</p>
                        </div>
                        ))}
                        {post.postTags.map(tag => (
                        <div className={styles.home_tags}>
                          <p key={tag.tag.id}>{tag.tag.name}</p>
                        </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
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