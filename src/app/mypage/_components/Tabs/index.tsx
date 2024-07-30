'use client';

import React, { useEffect } from 'react';
import styles from './index.module.scss';

type TabProps = {
  activeTab: string,
  setActiveTab: (tab: string) => void,
  fetchPosts: () => Promise<void>;
};

export const Tabs = ({ activeTab, setActiveTab, fetchPosts }: TabProps) => {

  const tabs = ['all', 'カテゴリー', 'タグ', '期間で絞る'];

  const handleTabClick = (tab: string) => {
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