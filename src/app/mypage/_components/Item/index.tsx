'use client';

import React from 'react';
import styles from '@/app/mypage/_components/Item/index.module.scss';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import Link from 'next/link';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

interface ItemProps {
  activeTab: string,
  posts: PostRequestBody[]; 
};

export const Item  = ({ activeTab, posts }: ItemProps) => {

  // activeTab に基づいて投稿をフィルタリングする
  const filterPosts = posts.filter(post => {
    switch (activeTab) {
      case 'カテゴリー':
        return post.postCategories.map(cate => cate.category.name === 'cate1');
      case 'タグ':
        return post.postTags.map(tag => tag.tag.name === 'tag1');
      case '期間で絞る':
        return true;
      case 'all':
      default:
        return true; // すべての投稿を表示
    };
  });
  
  return (
    <>
      {filterPosts.map((post) => (
        <div className={styles.home_container} key={post.id}>
          <ul className={styles.post}>
            <li className={styles.postList}>
              <div className={styles.editButton}>
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
              <Link href={`/mypage/posts/${post.id}`}>
                <div className={styles.top}>
                  <h2>{post.title}</h2>
                  <div>
                    {post.postCategories.map(category => (
                    <ul className={styles.home_categories} key={category.category.id}>
                      <li>{category.category.name}</li>
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
                <p>{post.content}</p>
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};