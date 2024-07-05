'use client';

import {
  useEffect,
  useState,
  FormEventHandler,
} from 'react';
import { Category } from '@/app/mypage/_types/Category';
import { Tag } from '@/app/mypage/_types/Tag';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import { useRouter } from 'next/navigation';

export default function usePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [profileId, setProfileId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [studyTimeId, setStudyTimeId] = useState<number | ''>();
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<PostRequestBody[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const { token } = useSupabaseSession();
  const router = useRouter();


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

}