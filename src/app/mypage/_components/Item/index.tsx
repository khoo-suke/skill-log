'use client';

import React, { useState } from 'react';
import styles from '@/app/mypage/_components/Item/index.module.scss';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import Link from 'next/link';
import 'react-calendar/dist/Calendar.css';
import { BaseEditor } from 'slate';
import { Slate, Editable, ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { RenderLeaf } from '@/app/mypage/_components/RenderLeaf';
import { ItemMenu } from '@/app/mypage/_components/Item/_components/ItemMenu';


// 親からステートを受け取る
interface ItemProps {
  activeTab: string,
  posts: PostRequestBody[]; 
  editor: BaseEditor & ReactEditor & HistoryEditor;
  fetchPosts: () => Promise<void>;
};

export const Item = ({ posts, editor, fetchPosts }: ItemProps) => {

  return (
    <>
      {posts.map((post) => (
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
              <Slate
                editor={editor}
                initialValue={JSON.parse(post.content)}
                key={JSON.stringify(post.content)}
                onChange={() => { }}
              >
                <Editable
                  readOnly
                  className={styles.readOnly}
                  renderLeaf={RenderLeaf}
                />
              </Slate>
              </Link>
            </div>
          </li>
        </ul>
      ))}
    </>
  );
};