'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styles from './_styles/Account.module.scss';
import Image from 'next/image';
import Wrapper from '@/app/_components/Wrapper';
import Link from 'next/link';
import Button from '@/app/_components/Button';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export default function Account() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [goal, setGoal] = useState('');
  const { token } = useSupabaseSession();


  //GET profile情報
  useEffect(() => {
    if (!token) return;
    
    const fetcher = async () => {
      const response = await fetch(`/api/account`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      
      const profile = await response.json();
      setName(profile.name);
      setMail(profile.email);
      setGoal(profile.goal);
    }

    fetcher();
  }, [token]);

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
        <div className={styles.Account}>
          <div className={styles.Label}>
            <label>ユーザー名</label>
            <input
              id="name"
              type="text"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              />
          </div>
          <div className={styles.Label}>
            <label>メールアドレス（ユーザーID）</label>
            <input
              id="mail"
              type="text"
              defaultValue={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <p>
              ※メールアドレスの変更はこのページから変更できません。<br />
              メールアドレスを変更する場合は、<Link href="">こちら</Link>から実施してください。
            </p>
          </div>
          <div className={styles.Label}>
            <label>パスワード</label>
            <input
              type="password"
              name="password"
              id="password"
              value="••••••••"
              />
          </div>
          <div className={styles.Label}>
            <label>目標</label>
            <textarea
              id="goal"
              cols={30}
              rows={4}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className={styles.btnArea}>
            <Button type='submit' color='black' size='middle'>変更</Button>
          </div>
        </div>
    </Wrapper>
    </>
  );
}