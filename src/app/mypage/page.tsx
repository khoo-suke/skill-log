'use client';

import React, { useEffect, useState, useCallback } from 'react';
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
import { PaginationArea } from './_components/PaginationArea';
import { Tab } from './_types/Tab';

const Mypage = () => {
  const [posts, setPosts] = useState<PostRequestBody[]>([]);
  const { token } = useSupabaseSession();
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 1ページあたりのアイテム数

  // GET 記事用
  const fetchPosts = useCallback(async () => {
    if (!token) return;

    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    
    if (response.ok) {
      const { posts } = await response.json();
      setPosts([...posts]);

    };
  }, [token]);

  // ステートが変更されるたびに更新する
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <div className={styles.calendarTop}>
        <CalendarArea />
      </div>
      <div className={styles.posts}>
        <div className={styles.cap}>
          <Wrapper size={1000}>
            <h2>
              投稿一覧
            </h2>
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              fetchPosts={fetchPosts}
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
              fetchPosts={fetchPosts}
            />
            <Item
              activeTab={activeTab}
              posts={posts}
              fetchPosts={fetchPosts}
              selectCategories={selectCategories}
              selectTags={selectTags}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
            <PaginationArea
              page={currentPage}
              onPageChange={setCurrentPage}
            />
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default Mypage;