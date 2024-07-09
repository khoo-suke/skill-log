'use client';

import { useState } from 'react';
import styles from './index.module.scss';

type TabProps = {
  tabs: string[],
  setActiveTab?: (tab: string) => void,
};

export const Tabs = ({ tabs }: TabProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // 選択されたタブを親コンポーネントに渡す
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.tabs}>
      <div>今の選択されているタブ:{activeTab}</div>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={activeTab === tab ? styles.active : ''}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};