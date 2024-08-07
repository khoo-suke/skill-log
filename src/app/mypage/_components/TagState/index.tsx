'use client';

import React from 'react';
import { Category } from '@/app/mypage/_types/Category';
import { CategorySelect } from './_components/CategorySelect';
import { Tag } from '@/app/mypage/_types/Tag';
import { TagSelect } from './_components/TagSelect';

// 親からステートを受け取る
interface TagStateProps {
  activeTab: string;
  selectCategories: Category[];
  setSelectCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  selectTags: Tag[];
  setSelectTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  fetchPosts: () => Promise<void>;
};

export const TagState: React.FC<TagStateProps> = ({ activeTab, selectCategories, setSelectCategories, selectTags, setSelectTags, fetchPosts }) => {
  
  // activeTab に基づいて条件でフィルタリング
  switch (activeTab) {
    case 'カテゴリー':
      return (
        <CategorySelect
          selectCategories={selectCategories}
          setSelectCategories={setSelectCategories}
          fetchPosts={fetchPosts}
        />
      );
    case 'タグ':
      return (
        <TagSelect
          selectTags={selectTags}
          setSelectTags={setSelectTags}
          fetchPosts={fetchPosts}
        />
      );
    case '期間で絞る':
      return (
        <div>
          <p>期間に基づくコンテンツを表示</p>
        </div>
      );
    default:
      return null;
  };
};