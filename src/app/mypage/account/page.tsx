'use client';

import { FormEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import styles from './_styles/Account.module.scss';
import Image from 'next/image';
import Wrapper from '@/app/_components/Wrapper';
import Link from 'next/link';
import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import Textarea from '@/app/_components/Textarea';

export default function Account() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const { token } = useSupabaseSession();
  const router = useRouter();


  //GET profile情報
  useEffect(() => {
    if (!token) return;
    
    const fetcher = async () => {
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
      
      const data = await response.json();
      const profile = data.profile[0];
      setName(profile.name);
      setEmail(profile.email);
      setGoal(profile.goal);
      setProfileImageUrl(profile.profileImageUrl);
      console.log(profile);
    };

    fetcher();
  }, [token]);

  // PUT
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
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
        }),
      });

      alert('更新完了');
      router.replace('/mypage/account');
    } catch (error) {
      console.error('プロフィール情報の更新中にエラー', error);
    };
  };


  return (
    <>
      <div className={styles.Cap}>
        <Wrapper size={800}>
          <h2>
            アカウント設定
          </h2>
        </Wrapper>
    </div>
      <Wrapper size={700}>
        <form onSubmit={handleSubmit} className={styles.Account}>
          <div className={styles.Label}>
            <label>ユーザー名</label>
            <Input
              name={'name'}
              id={'name'}
              type={'text'}
              value={name}
              onChange={setName}
              />
          </div>
          <div className={styles.Label}>
            <label>メールアドレス（ユーザーID）</label>
            <Input
              name={'email'}
              id={'email'}
              type={'email'}
              value={email}
              />
            <p>
              ※メールアドレス（ユーザーID）の変更はこのページから変更できません。変更したい場合は、<Link href="">こちら</Link>から実施してください。
            </p>
          </div>
          <div className={styles.Label}>
            <label>パスワード</label>
            <Input
              name={'password'}
              id={'password'}
              type={'password'}
              value={'••••••••'}
            />
            <p>※パスワードはこの画面からは変更できません。変更したい場合は<Link href="">こちら</Link>のページから再設定してください。</p>
          </div>
          <div className={styles.Label}>
            <label>目標</label>
            <Textarea
              id={'goal'}
              cols={30}
              rows={4}
              value={goal}
              onChange={setGoal}
            />
          </div>
          <div className={styles.btnArea}>
            <Button type='submit' color='black' size='middle'>変更</Button>
          </div>
        </form>
    </Wrapper>
    </>
  );
};