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
import Label from '@/app/_components/Label';
import TextEditor from '@/app/mypage/posts/new/_components/TextEditor';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [studyTimeId, setStudyTimeId] = useState<number | ''>();
  const [profileId, setProfileId] = useState('');
  const { token } = useSupabaseSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);

  // トークン
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
    if (!token) return;
    
    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        content,
        studyTimeId: Number(studyTimeId),
        profileId,
        imageUrl,
        createdAt,
        postCategories: selectCategories,
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

  // 現在の時間を取得
  useEffect(() => {
    const now = new Date();
    const defaultDate = now.toISOString();
    setCreatedAt(defaultDate);
  })
  
  return (
    <>
      <div className={styles.newPost}>
        <Wrapper size={800}>
          <div className={styles.topLink}>
            <Link href="/mypage">トップページに戻る</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.title}>
              <Label value={'タイトル'} />
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
                <Label value={'勉強・作業時間(h)'} />
                <input
                  type={'text'}
                  name={'studyTimeId'}
                  id={'studyTimeId'}
                  onChange={(e) => setStudyTimeId(Number(e.target.value))}
                  value={studyTimeId}
                />
                <span>時間</span>
              </div>
              <div className={styles.date}>
                <Label value={'投稿日'} />
                <div className={styles.inner}>
                  <div className={styles.year}>
                  <Input
                      type={'text'}
                      name={'year'}
                      id={'year'}
                      defaultValue={String(new Date(createdAt).getFullYear())}
                    />
                    <span>年</span>
                  </div>
                  <div className={styles.month}>
                    <Input
                      type={'text'}
                      name={'month'}
                      id={'month'}
                      defaultValue={String(new Date(createdAt).getMonth() + 1)}
                    />
                    <span>月</span>
                  </div>
                  <div className={styles.day}>
                    <Input
                      type={'text'}
                      name={'day'}
                      id={'day'}
                      defaultValue={String(new Date(createdAt).getDate())}
                    />
                    <span>日</span>
                  </div>
                  <div className={styles.time}>
                    <Input
                      type={'text'}
                      name={'hour'}
                      id={'hour'}
                      defaultValue={String(new Date(createdAt).getHours())}
                    />
                    <span>:</span>
                    <Input
                        type={'text'}
                        name={'minutes'}
                      id={'minutes'}
                      defaultValue={String(new Date(createdAt).getMinutes())}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Label value={'カテゴリー'} />
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
              <Label value={'タグ'} />
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
              <Label value={'内容'} />
              <Textarea
              id={'content'}
              cols={30}
              rows={6}
              onChange={setContent}
              />
              {/* <TextEditor /> */}
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