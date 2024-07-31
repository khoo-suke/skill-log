'use client';

import React,{ useEffect, useState } from 'react';
import styles from './_styles/PostId.module.scss';
import { useParams } from 'next/navigation'
import { Category } from "@/app/mypage/_types/Category";
import { Tag } from '@/app/mypage/_types/Tag';
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { createEditor, Descendant } from 'slate';
import { Slate, Editable } from 'slate-react';
import { RenderLeaf } from '@/app/mypage/_components/RenderLeaf';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { ItemMenu } from '@/app/mypage/_components/Item/_components/ItemMenu';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import { ReturnTop } from '../new/_components/ReturnTop';
import { Sidebar } from '@/app/mypage/_components/Sidebar';

export default function Page() {
  const [post, setPost] = useState<PostRequestBody | null>(null);
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const { token } = useSupabaseSession();
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [editor] = useState(() => withHistory(withReact(createEditor())));
  const [content, setContent] = useState<Descendant[]>([]);

  //GET 記事用
  const fetchPosts = async () => {
    if (!token) return;
    
    try {
      const res = await fetch(`/api/posts/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const data = await res.json();

      const { post } = data;
      setPost(post);

      setTitle(post.title);
      setContent(JSON.parse(post.content));
      setSelectCategories(post.postCategories.map((cate: any) => cate.category));
      setSelectTags(post.postTags.map((tag: any) => tag.tag));
    }
    catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    fetchPosts();
  }, [token, id]);

  return (
    <>
      <div className={styles.postId}>
        <div className={styles.main}>
          <ReturnTop/>
          <div className={styles.inner}>
            {post && (
              <ItemMenu
                postId={post.id}
                fetchPosts={fetchPosts}
              />
            )}
            <div className={styles.topArea}>
              <h2>{title}</h2>
              <div className={styles.markArea}>
                {selectCategories.length > 0 && (
                  <ul className={styles.home_categories}>
                    {selectCategories.map((category) => (
                      <li key={category.id}>{category.name}</li>
                    ))}
                  </ul>
                )}
                {selectTags.length > 0 && (
                  <ul className={styles.home_tags}>
                    {selectTags.map((tag) => (
                      <li key={tag.id}>{tag.name}</li>))}
                  </ul>
                )}
              </div>
            </div>
            <div>
              <Slate
                editor={editor}
                initialValue={content}
                key={JSON.stringify(content)}
              >
                <Editable
                  readOnly
                  renderLeaf={RenderLeaf}
                />
              </Slate>
            </div>
          </div>
        </div>
        <Sidebar/>
      </div>
    </>
  );
}