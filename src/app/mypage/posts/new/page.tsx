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

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [studyTimeId, setStudyTimeId] = useState('');
  const [profileId, setProfileId] = useState('');
  const { token } = useSupabaseSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

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
      }),
  }
  )

    router.replace('/mypage')
    alert('記事作成')
  }

  // GET カテゴリー用
//   useEffect(() => {
//     if (!token) return
    
//   const fetcher = async () => {
//     const res = await fetch(`/api/categories`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       }
//     });
//     const data = await res.json();
//     setAllCategories(data.categories);
//   }

//   fetcher();
// }, [token])

  return (
    <>
      <div className={styles.newPost}>
        <div className="wrapper--800 card">
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
          </div>
          <div className="mb-10">
            <label>
              タグ
            </label>
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
        </div>
      </div>
    </>
  );
}