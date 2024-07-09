'use client';

import {
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import { Category } from '@/app/mypage/_types/Category';
import { Tag } from '@/app/mypage/_types/Tag';
import styles from '@/app/mypage/posts/new/_styles/PostNew.module.scss';
import { Wrapper } from '@/app/_components/Wrapper';
import { Button } from '@/app/_components/Button';
import { Label } from '@/app/_components/Label';
import { TextEditor } from '@/app/mypage/posts/new/_components/TextEditor';
import { Title } from './_components/Title';
import { DateInput } from './_components/DateInput';
import { CategoryList } from './_components/CategoryList';
import { TagList } from './_components/TagList';
import { ReturnTop } from './_components/ReturnTop';
import { CustomElement } from './_types/CustomElement';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<CustomElement[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [profileId, setProfileId] = useState('');
  const { token } = useSupabaseSession();
  const router = useRouter();
  const [posts, setPosts] = useState<PostRequestBody[]>([]);
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
      const response = await fetch('/api/posts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      const { posts } = await response.json();
      setPosts([...posts]);
    };

    fetcher();

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
        imageUrl,
        createdAt,
        postCategories: selectCategories,
        postTags: selectTags,
      })
    });

    router.replace('/mypage');
    alert('記事作成');
  };

  // 子コンポーネントからタイトル
  const handleTitleChange = (createTitle: string) => {
    setTitle(createTitle);
  };

  // 子コンポーネントから日付 年
  const handleYearChange = (createYear: string) => {
    setYear(createYear);
  };

  // 子コンポーネントから日付 月
  const handleMonthChange = (createMonth: string) => {
    setMonth(createMonth);
  };

  // 子コンポーネントから日付 日
  const handleDayChange = (createDay: string) => {
    setDay(createDay);
  };

  // 子コンポーネントから日付 時間
  const handleHourChange = (createHour: string) => {
    setYear(createHour);
  };

  // 子コンポーネントから日付 分
  const handleMinutesChange = (createMinutes: string) => {
    setMinutes(createMinutes);
  };

  // 子コンポーネントからカテゴリー
  const handleSelectCategory = () => {
    setSelectCategories(selectCategories);
  }

  // 子コンポーネントからテキストエディタ
  const handleContentChange = (createContent: CustomElement[]) => {
    setContent(createContent);
  };
  
  return (
    <>
      <div className={styles.newPost}>
        <Wrapper size={800}>
          <ReturnTop/>
          <form onSubmit={handleSubmit}>
            <Title
              onTitle={handleTitleChange}
            />
            <DateInput
              onYear={handleYearChange}
              onMonth={handleMonthChange}
              onDay={handleDayChange}
              onHour={handleHourChange}
              onMinutes={handleMinutesChange}
            />
            <CategoryList
              onCategory={handleSelectCategory}
            />
            <TagList/>
            <div>
              <Label value='内容' />
              <TextEditor
                onContent={handleContentChange}/>
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