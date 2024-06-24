'use client';

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'next/navigation'
import { Post } from '@/app/mypage/_types/Post';
import { Category } from "@/app/mypage/_types/Category";
import { Tag } from '@/app/mypage/_types/Tag';
import { studyTime } from '@/app/mypage/_types/StudyTime';
import { Profile } from '@/app/mypage/_types/Profile';
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation"
import Link from 'next/link';
import '@/app/globals.scss';
import styles from '@/app/mypage/posts/new/_styles/PostNew.module.scss';
import Wrapper from '@/app/_components/Wrapper';

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');
  const [studyTimeId, setStudyTimeId] = useState('');
  const [profileId, setProfileId] = useState('');
  const { token } = useSupabaseSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (!token) return;
    const fetcher = async () => {
      const res = await fetch('/api/posts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      const { posts } = await res.json()
      setPosts([...posts])
    }

    fetcher()
  }, [token]);

  // POST
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        studyTimeId,
        profileId,
        imageUrl,
        createdAt,
        categories: selectCategories,
      }),
  }
  )

    router.replace('/mypage')
    alert('記事作成')
  }

  // GET カテゴリー用
  useEffect(() => {
    if (!token) return
    
    const fetcher = async () => {
      const res = await fetch(`/api/categories`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });
      const data = await res.json();
      setAllCategories(data.categories);
    }

    fetcher();
  }, [token]);

  // SELECT カテゴリー
  const handleChangeCategory: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    const isSelected = !!selectCategories.find(
      (category) => category.id === Number(value)
    );
  
    if (isSelected) {
      setSelectCategories(
        selectCategories.filter((category) => category.id !== Number(value))
      );
    } else {
      const selectCategory = allCategories.find(
        (category) => category.id === Number(value)
      );
      setSelectCategories([...selectCategories, selectCategory!]);
      }
  }

    // GET タグ用
    useEffect(() => {
      if (!token) return
      
      const fetcher = async () => {
        const res = await fetch(`/api/tags`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          }
        });
        const data = await res.json();
        setAllTags(data.tags);
      }
  
      fetcher();
    }, [token]);
  
    // SELECT タグ
    const handleChangeTag: ChangeEventHandler<HTMLSelectElement> = (e) => {
      const value = e.target.value;
      const isSelected = !!selectTags.find(
        (tag) => tag.id === Number(value)
      );
    
      if (isSelected) {
        setSelectTags(
          selectTags.filter((tag) => tag.id !== Number(value))
        );
      } else {
        const selectTag = allTags.find(
          (tag) => tag.id === Number(value)
        );
        setSelectTags([...selectTags, selectTag!]);
        }
      }

  return (
    <>
      <div className={styles.newPost}>
        <Wrapper size={800}>
          <div className={styles.topLink}>
            <Link href="/mypage">トップページに戻る</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.title}>
              <label>
                タイトル
              </label>
              <input
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.flexBox}>
              <div className={styles.studyTime}>
                <label>
                  勉強・作業時間(h)
                </label>
                <input
                  id="studyTimeId"
                  type="text"
                  onChange={(e) => setStudyTimeId(e.target.value)}
                />
                <span>時間</span>
              </div>
              <div className={styles.date}>
                <label>
                  投稿日
                </label>
                <div className={styles.inner}>
                  <div className={styles.year}>
                    <input
                      type="text"
                    />
                    <span>年</span>
                  </div>
                  <div className={styles.month}>
                    <input
                      type="text"
                    />
                    <span>月</span>
                  </div>
                  <div className={styles.day}>
                    <input
                      type="text"
                    />
                    <span>日</span>
                  </div>
                  <div className={styles.time}>
                    <input
                      type="text"
                    />
                    <span>:</span>
                    <input
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-10">
              <label>
                カテゴリー
              </label>
              <select
                  multiple
                  value={selectCategories.map((category) => String(category.id))}
                  onChange={handleChangeCategory}
                >
                {allCategories && allCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-10">
              <label>
                タグ
              </label>
              <select
                  multiple
                  value={selectTags.map((tag) => String(tag.id))}
                  onChange={handleChangeTag}
                >
                {allTags && allTags.map(tag => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label>
                内容
              </label>
              <textarea
                id="content"
                cols={30}
                rows={6}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="delete"
              >
                投稿
              </button>
            </div>
          </form>
        </Wrapper>
      </div>
    </>
  );
}