'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/mypage/_styles/Mypage.module.scss';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import 'react-calendar/dist/Calendar.css';
import { CalendarArea } from './_components/CalenderArea';
import { Wrapper } from '../_components/Wrapper';
import { Tabs } from './_components/Tabs';
import { Category } from '@/app/mypage/_types/Category';
import { Tag } from '@/app/mypage/_types/Tag';
import { Item } from './_components/Item';
import { TagState } from './_components/TagState';

const Mypage = () => {
  const [posts, setPosts] = useState<PostRequestBody[]>([]);
  const { token } = useSupabaseSession();
  const [activeTab, setActiveTab] = useState('all'); 
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);

  // トークン
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
    };

    fetcher();
  }, [token]);

  return (
    <>
      <CalendarArea/>
      <div className={styles.posts}>
        <div className={styles.cap}>
          <Wrapper size={1000}>
            <h2>
              投稿一覧
            </h2>
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Wrapper>
        </div>
        <div className={styles.postArea}>
          <Wrapper size={800}>
            <TagState
              activeTab={activeTab}
              selectCategories={selectCategories}
              setSelectCategories={setSelectCategories}
              selectTags={selectTags}
              setSelectTags={setSelectTags}
            />
            <Item
              activeTab={activeTab}
              posts={posts}
            />
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default Mypage;