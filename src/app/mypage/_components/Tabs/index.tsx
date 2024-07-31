'use client';

import React from 'react';
import styles from './index.module.scss';
import { Tab } from '@/app/mypage/_types/Tab';

interface TabProps {
  activeTab: Tab,
  setActiveTab: (tab: Tab) => void,
  fetchPosts: () => Promise<void>;
};

export const Tabs = ({ activeTab, setActiveTab, fetchPosts }: TabProps) => {

  // 追加機能用コメントアウト
  // const tabs: Tab[] = ['all', 'カテゴリー', 'タグ', '期間で絞る'];

  const tabs: Tab[] = ['all', 'カテゴリー', 'タグ'];

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    fetchPosts();
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? styles.active : ''}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};