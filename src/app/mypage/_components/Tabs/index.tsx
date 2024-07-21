'use client';

import { useState } from 'react';
import styles from './index.module.scss';

type TabProps = {
  activeTab: string,
  setActiveTab: (tab: string) => void,
};

export const Tabs = ({ activeTab, setActiveTab }: TabProps) => {

  const tabs = ['all', 'カテゴリー', 'タグ', '期間で絞る'];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
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