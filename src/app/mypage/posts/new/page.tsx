'use client';

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Post } from '@/app/mypage/_types/Post';
import { Category } from '@/app/mypage/_types/Category';
import { Tag } from '@/app/mypage/_types/Tag';
import '@/app/globals.scss';
import styles from '@/app/mypage/posts/new/_styles/PostNew.module.scss';
import Wrapper from '@/app/_components/Wrapper';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import Textarea from '@/app/_components/Textarea';

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
      const { posts } = await res.json();
      setPosts([...posts]);
    };

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
        postTags: selectTags,
      }),
    });

    router.replace('/mypage');
    alert('記事作成');
  };

  // GET カテゴリー用
  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const res = await fetch(`/api/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });
      const data = await res.json();
      setAllCategories(data.categories);
    };

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
    };
  };

    // GET タグ用
    useEffect(() => {
      if (!token) return
      
      const fetcher = async () => {
        const res = await fetch(`/api/tags`, {
          method: 'GET',
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
              <Input
              type={'text'}
              name={'title'}
              id={'title'}
              onChange={setTitle}
              value={title}
            />
            </div>
            <div className={styles.flexBox}>
              <div className={styles.studyTime}>
                <label>
                  勉強・作業時間(h)
                </label>
                <Input
                  type={'text'}
                  name={'studyTimeId'}
                  id={'studyTimeId'}
                  onChange={setStudyTimeId}
                  value={studyTimeId}
                />
                <span>時間</span>
              </div>
              <div className={styles.date}>
                <label>
                  投稿日
                </label>
                <div className={styles.inner}>
                  <div className={styles.year}>
                  <Input
                      type={'text'}
                      name={'year'}
                      id={'year'}
                    />
                    <span>年</span>
                  </div>
                  <div className={styles.month}>
                    <Input
                      type={'text'}
                      name={'month'}
                      id={'month'}
                    />
                    <span>月</span>
                  </div>
                  <div className={styles.day}>
                    <Input
                      type={'text'}
                      name={'day'}
                      id={'day'}
                    />
                    <span>日</span>
                  </div>
                  <div className={styles.time}>
                    <Input
                        type={'text'}
                        name={'hour'}
                        id={'hour'}
                    />
                    <span>:</span>
                    <Input
                        type={'text'}
                        name={'minutes'}
                        id={'minutes'}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
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
            <div>
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
            <div>
              <label>
                内容
              </label>
              <Textarea
              id={'content'}
              cols={30}
              rows={6}
              onChange={setContent}
            />
            </div>
            <div className={styles.btnArea}>
              <Button type='submit' color='pink' size='large'>
                投稿
              </Button>
            </div>
          </form>
        </Wrapper>
      </div>
    </>
  );
};