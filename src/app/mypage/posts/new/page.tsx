'use client';

import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
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
import usePost from './_hooks/usePost';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [studyTimeId, setStudyTimeId] = useState<number | ''>();
  const [profileId, setProfileId] = useState('');
  const { token } = useSupabaseSession();
  const router = useRouter();
  const [posts, setPosts] = useState<PostRequestBody[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [year, setYear] = useState(String(new Date(createdAt).getFullYear()));
  const [month, setMonth] = useState(String(new Date(createdAt).getMonth() + 1));
  const [day, setDay] = useState(String(new Date(createdAt).getDay()));
  const [hour, setHour] = useState(String(new Date(createdAt).getHours()))
  const [minutes, setMinutes] = useState(String(new Date(createdAt).getMinutes()));
  const [newCategory, setNewCategory] = useState("");


  // トークン
  useEffect(() => {
    if (!token) return;
    const fetcher = async () => {
      const response = await fetch('/api/posts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      const { posts } = await response.json();
      setPosts([...posts]);
    };

    fetcher()

  }, [token]);

  // POST 新規記事作成
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
      const response = await fetch(`/api/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();
      setAllCategories(data.categories);
    };

    fetcher();
  }, [token]);

  //POST カテゴリー作成用
  const handleAddCategory: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (!token) return;

    const response = await fetch(`/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        name: newCategory,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setAllCategories([...allCategories, data.category]);
      setNewCategory('');
    }
    alert('カテゴリー作成');
  };


  // SELECT カテゴリー
  const handleChangeCategory = (categoryId: number) => {

    const isSelected = !!selectCategories.find(
      (category) => category.id === categoryId);
  
    if (isSelected) {
      setSelectCategories(
        selectCategories.filter((category) => category.id !== categoryId)
      );
    } else {
      const selectCategory = allCategories.find(
        (category) => category.id === categoryId
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
    };
  };

  // 現在の時間を取得
  useEffect(() => {
    const now = new Date();
    const defaultDate = now.toISOString();
    setCreatedAt(defaultDate);
    setYear(String(now.getFullYear()));
    setMonth(String(now.getMonth() + 1));
    setDay(String(now.getDate()));
    setHour(String(now.getHours()));
    setMinutes(String(now.getMinutes()));
  }, []);
  
  return (
    <>
      <div className={styles.newPost}>
        <Wrapper size={800}>
          <div className={styles.topLink}>
            <Link href="/mypage">トップページに戻る</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.title}>
              <Label value='タイトル' />
              <Input
              type={'text'}
              name={'title'}
              id={'title'}
              onChange={setTitle}
              value={title}
            />
            </div>
            <div className={styles.date}>
              <Label value='投稿日' />
              <div className={styles.inner}>
                <div className={styles.year}>
                <Input
                    type={'text'}
                    name={'year'}
                    id={'year'}
                    value={year}
                  />
                  <span>年</span>
                </div>
                <div className={styles.month}>
                  <Input
                    type={'text'}
                    name={'month'}
                    id={'month'}
                    value={month}
                  />
                  <span>月</span>
                </div>
                <div className={styles.day}>
                  <Input
                    type={'text'}
                    name={'day'}
                    id={'day'}
                    value={day}
                  />
                  <span>日</span>
                </div>
                <div className={styles.time}>
                  <Input
                    type={'text'}
                    name={'hour'}
                    id={'hour'}
                    value={hour}
                  />
                  <span>:</span>
                  <Input
                      type={'text'}
                      name={'minutes'}
                    id={'minutes'}
                    value={minutes}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label value='カテゴリー' />
              {/* <select
                  multiple
                  value={selectCategories.map((category) => String(category.id))}
                  onChange={handleChangeCategory}
                >
                {allCategories && allCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select> */}
              <div className={styles.category}>
                <ul>
                  {allCategories && allCategories.map(category => (
                    <li key={category.id}>
                      <input
                        type="checkbox"
                        onChange={() => handleChangeCategory(category.id)}
                      />
                      <label>{category.name}</label>
                    </li>
                  ))}
                </ul>
                <div>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button type="button" onClick={handleAddCategory}>＋</button>
              </div>
              </div>
            </div>
            <div>
              <Label value='タグ' />
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
              <Label value='内容' />
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