'use client';

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'next/navigation'
import { Category } from "@/app/mypage/_types/Category";
import { Tag } from '@/app/mypage/_types/Tag';
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation"
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import styles from './_styles/PostId.module.scss';
import Wrapper from '@/app/_components/Wrapper';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const { id } = useParams();
  const { token } = useSupabaseSession();
  const [thumbnailImageKey, setThumbnailImageKey] = useState(``);
  const router = useRouter();

  //GET 記事用
  useEffect(() => {
    if (!token) return
    
    const fetcher = async () => {
      const res = await fetch(`/api/posts/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const data = await res.json();
      const { post } = data;
      setTitle(post.title);
      setContent(post.content);
      setThumbnailImageKey(post.thumbnailImageKey);
      setSelectCategories(post.postCategories.map((cate: any) => cate.category));
    }

    fetcher();
  }, [token]);

  return (
    <>
      <div className={styles.postId}>
        <Wrapper size={800}>
          <div className={styles.inner}>
            <div className={styles.topArea}>
              <h2>{title}</h2>
            </div>
            <div>
              <h2>{title}</h2>
            </div>
            <div>
              <p>{content}</p>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}