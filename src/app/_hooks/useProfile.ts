'use client';

import {  useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export const useProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [profileImageKey, setProfileImageKey] = useState('');
  const { token } = useSupabaseSession();
  const router = useRouter();

  //GET profile情報
  useEffect(() => {
    if (!token) return;
    
    const fetcher = async () => {
      try {
        const response = await fetch(`/api/account`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error('プロフィールが見つからない');
        };

        const user = await response.json();

        const profile = user.profile;
        setName(profile.name || '');
        setEmail(profile.email || '');
        setGoal(profile.goal || '');
        setProfileImageKey(profile.profileImageKey || '');

      } catch (error) {
        console.error('プロフィール情報の取得中にエラー', error);
      };
    };

    fetcher();
  }, [token]);

  // PUT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    const requestData = {
      name,
      goal,
    };

    console.log('送信するデータ:', requestData);

    try {
      await fetch(`/api/account`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },

        body: JSON.stringify({
          name,
          goal,
          profileImageKey,
        }),
      });

      alert('更新完了');
      router.replace('/mypage/account');
    } catch (error) {
      console.error('プロフィール情報の更新中にエラー', error);
    };
  };


  return {
    name,
    setName,
    email,
    setEmail,
    goal,
    setGoal,
    profileImageKey,
    setProfileImageKey,
    handleSubmit,
  };
};