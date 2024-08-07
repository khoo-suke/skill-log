'use client';

import React, { FormEventHandler, useEffect, useState } from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Category } from '@/app/mypage/_types/Category';
import { Tag } from '@/app/mypage/_types/Tag';
import styles from '@/app/mypage/posts/new/_styles/PostNew.module.scss';
import { Wrapper } from '@/app/_components/Wrapper';
import { Button } from '@/app/_components/Button';
import { Label } from '@/app/_components/Label';
import { TextEditor } from '@/app/mypage/posts/new/_components/TextEditor';
import { Title } from '../../new/_components/Title';
import { DateInput } from '../../new/_components/DateInput';
import { CategoryList } from '../../../_components/CategoryList';
import { TagList } from '../../../_components/TagList';
import { Breadcrumb } from './_components/Breadcrumb';
import { CustomElement } from '../../new/_types/CustomElement';
import { useParams, useRouter } from 'next/navigation';

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: '初期設定のテキスト' }],
  },
];

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<CustomElement[]>(initialValue);
  const { id } = useParams();
  const { token } = useSupabaseSession();
  const [createdAt, setCreatedAt] = useState('');
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const router = useRouter();

  //GET 記事用
  useEffect(() => {
    if (!token) return
    
    const fetcher = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        const data = await response.json();

        const { post } = data;
        setTitle(post.title);
        setCreatedAt(post.createdAt);

        const date = new Date(post.createdAt);
        setYear(String(date.getFullYear()));
        setMonth(String(date.getMonth() + 1));
        setDay(String(date.getDate()));
        setHour(String(date.getHours()));
        setMinutes(String(date.getMinutes()));

        setSelectCategories(post.postCategories.map((cate: any) => cate.category));
        setSelectTags(post.postTags.map((tag: any) => tag.tag));

        const postContent: CustomElement[] = JSON.parse(post.content);
        setContent(postContent);
        setIsContentLoaded(true);
      }
      catch (error) {
        console.error(error);
      };
    };

    fetcher();
  }, [token, id]);

  // 記事更新
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!token) return;

  // データベースに合わせた形式に変更　カテゴリー
  const postCategories = selectCategories.map(category => ({
    category: { id: category.id, name: category.name }
  }));
  
  // データベースに合わせた形式に変更　タグ
  const postTags = selectTags.map(tag => ({
    tag: { id: tag.id, name: tag.name }
  }));
    
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          title,
          content: JSON.stringify(content), 
          createdAt,
          postCategories,
          postTags,
        }),
      });

      alert('更新完了');
      router.replace(`/mypage/posts/${id}`);
    } catch (error) {
      console.error(error);
    };
  };
    
  return (
    <>
      <div className={styles.newPost}>
        <Wrapper size={800}>
          <Breadcrumb/>
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
              {isContentLoaded && (
              <TextEditor
                content={content}
                setContent={setContent}
                />
               )}
            </div>
            <div className={styles.btnArea}>
              <Button
                type='submit'
                color='pink'
                size='middle'
              >
                編集
              </Button>
            </div>
          </form>
        </Wrapper>
      </div>
    </>
  );
};