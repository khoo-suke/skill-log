'use client';

import React from 'react';
import styles from '@/app/mypage/_components/Item/index.module.scss';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import Link from 'next/link';
import 'react-calendar/dist/Calendar.css';
import { ItemMenu } from '@/app/mypage/_components/Item/_components/ItemMenu';
import { Category } from '@/app/mypage/_types/Category';
import { Tag } from '@/app/mypage/_types/Tag';
import { SlateEditor } from '@/app/mypage/_components/Item/_components/SlateEditor';

// 親からステートを受け取る
interface ItemProps {
  activeTab: string,
  posts: PostRequestBody[]; 
  fetchPosts: () => Promise<void>,
  selectCategories: Category[],
  selectTags: Tag[],
  currentPage: number,
  itemsPerPage: number,
};

export const Item = ({ activeTab, posts, fetchPosts, selectCategories, selectTags, currentPage, itemsPerPage }: ItemProps) => {
  
// activeTabによってフィルタリングを変える
const filteredPosts = posts.filter(post => {
  switch (activeTab) {
    case 'all':
      return true; // すべての投稿を表示
    
    case 'カテゴリー':
      return selectCategories.length === 0 || post.postCategories.some(category => 
        selectCategories.some(selectedCategory => 
          selectedCategory.id === category.category.id
        )
      );

    case 'タグ':
      return selectTags.length === 0 || post.postTags.some(tag => 
        selectTags.some(selectedTag => 
          selectedTag.id === tag.tag.id
        )
      );

    case '期間で絞る':
      // 期間設定のフィルタリングの内容をここに追加
      return true;

    default:
      return true; // デフォルトですべての投稿を表示
  };
});
  
  // 現在のページに基づいて表示するポストのインデックスを計算
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // ポストのスライスを取得してページネーションを実装
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <>
      {paginatedPosts.map((post) => (
        <ul className={styles.post} key={post.id}>
          <li className={styles.postList}>
            <div className={styles.postListInner}>
              <ItemMenu
                postId={post.id}
                fetchPosts={fetchPosts}
              />
              <Link href={`/mypage/posts/${post.id}`}>
                <div className={styles.top}>
                  <h2>{post.title}</h2>
                  <div>
                    {post.postCategories.map(cate => (
                    <ul className={styles.home_categories} key={cate.category.id}>
                      <li>{cate.category.name}</li>
                    </ul>
                    ))}
                    {post.postTags.map(tag => (
                    <ul className={styles.home_tags} key={tag.tag.id}>
                      <li>{tag.tag.name}</li>
                    </ul>
                    ))}
                  </div>
                </div>
                <div>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <SlateEditor
                  posts={posts}
                  postId={post.id}
                />
              </Link>
            </div>
          </li>
        </ul>
      ))}
    </>
  );
};