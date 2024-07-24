'use client';

import {
  FormEventHandler,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import { Category } from '@/app/mypage/_types/Category';
import { Tag } from '@/app/mypage/_types/Tag';
import styles from '@/app/mypage/posts/new/_styles/PostNew.module.scss';
import { Wrapper } from '@/app/_components/Wrapper';
import { Button } from '@/app/_components/Button';
import { Label } from '@/app/_components/Label';
import { TextEditor } from '@/app/mypage/posts/new/_components/TextEditor';
import { Title } from '../../new/_components/Title';
import { DateInput } from '../../new/_components/DateInput';
import { CategoryList } from '../../new/_components/CategoryList';
import { TagList } from '../../new/_components/TagList';
import { ReturnTop } from '../../new/_components/ReturnTop';
import { CustomElement } from '../../new/_types/CustomElement';
import { useParams } from 'next/navigation';

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: '初期設定のテキストテキスト' }],
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

  //GET 記事用
  useEffect(() => {
    if (!token) return
    
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        const data = await res.json();

        const { post } = data;
        setTitle(post.title);
        setCreatedAt(post.createdAt);
        setSelectCategories(post.postCategories.map((cate: any) => cate.category));
        setSelectTags(post.postTags.map((tag: any) => tag.tag));
        setContent(JSON.parse(post.content));
      }
      catch (error) {
        console.error(error);
      };
    };

    fetcher();
  }, [token, id]);
  
  return (
    <>
      <div className={styles.newPost}>
        <Wrapper size={800}>
          <ReturnTop/>
          <form>
            <Title
              title={title}
              setTitle={setTitle}
            />
            {/* <DateInput/> */}
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
                setContent={setContent}
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