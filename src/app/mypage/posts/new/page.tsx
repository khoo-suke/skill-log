'use client';

import {
  FormEventHandler,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Category } from '@/app/mypage/_types/Category';
import { Tag } from '@/app/mypage/_types/Tag';
import styles from '@/app/mypage/posts/new/_styles/PostNew.module.scss';
import { Wrapper } from '@/app/_components/Wrapper';
import { Button } from '@/app/_components/Button';
import { Label } from '@/app/_components/Label';
import { TextEditor } from '@/app/mypage/posts/new/_components/TextEditor';
import { Title } from './_components/Title';
import { DateInput } from './_components/DateInput';
import { CategoryList } from '../../_components/CategoryList';
import { TagList } from '../../_components/TagList';
import { ReturnTop } from './_components/ReturnTop';
import { CustomElement } from './_types/CustomElement';

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: '初期設定のテキストテキスト' }],
  },
];

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<CustomElement[]>(initialValue);
  const [createdAt, setCreatedAt] = useState('');
  const { token } = useSupabaseSession();
  const router = useRouter();
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [year, setYear] = useState(String(new Date(createdAt).getFullYear()));
  const [month, setMonth] = useState(String(new Date(createdAt).getMonth() + 1));
  const [day, setDay] = useState(String(new Date(createdAt).getDate()));
  const [hour, setHour] = useState(String(new Date(createdAt).getHours()));
  const [minutes, setMinutes] = useState(String(new Date(createdAt).getMinutes()));
  
  // トークン
  useEffect(() => {
    if (!token) return;
    
    const fetcher = async () => {
      await fetch('/api/posts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
    };

    fetcher();
  }, [token]);

  // POST 新規記事作成
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!token) return;
    
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        content: JSON.stringify(content),
        createdAt,
        postCategories: selectCategories,
        postTags: selectTags,
      })
    });

    if (!response.ok) {
      throw new Error('記事作成エラー');
    };

    router.replace('/mypage');
    alert('記事作成');
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

  // 型をJSONに変換
  const handleContentChange: Dispatch<SetStateAction<CustomElement[]>> = (newContent) => {
    setContent(newContent);
  };
  
  return (
    <>
      <div className={styles.newPost}>
        <Wrapper size={800}>
          <ReturnTop/>
          <form onSubmit={handleSubmit}>
            <Title
              title={title}
              setTitle={setTitle}
            />
            <DateInput
              year={year}
              setYear={setYear}
              month={month}
              setMonth={setMonth}
              day={day}
              setDay={setDay}
              hour={hour}
              setHour={setHour}
              minutes={minutes}
              setMinutes={setMinutes}
            />
            <CategoryList
              selectCategories={selectCategories}
              setSelectCategories={setSelectCategories}
            />
            <TagList
              selectTags={selectTags}
              setSelectTags={setSelectTags}
            />
            <div>
              <Label value='内容' />
              <TextEditor
                content={content}
                setContent={handleContentChange}
              />
            </div>
            <div className={styles.btnArea}>
              <Button
                type='submit'
                color='pink'
                size='middle'
              >
                投稿
              </Button>
            </div>
          </form>
        </Wrapper>
      </div>
    </>
  );
};