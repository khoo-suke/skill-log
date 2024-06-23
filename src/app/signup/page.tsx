'use client';

import styles from './_styles/Signup.module.scss';
import { supabase } from '@/utils/supabase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Wrapper from '../_components/Wrapper';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     emailRedirectTo: `/login`,
    //   },
    // });

    // setIsSubmitting(false);
    
    // if (error) {
    //   alert('登録失敗');
    //   console.log('Supabase signUp error:', error);
    // } else {
    //   setEmail('');
    //   setPassword('');
    //   alert('確認メール送信');
    //   await handleSend(email);
    // };
  // }

  // const handleSend = async (sendEmail: string) => {
  //   try {
  //     const response = await fetch('/api/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email: sendEmail }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('送信失敗');
  //     }
  //       router.push('/signup/thanks');
  //     } catch (error) {
  //       console.error('メール送信エラー:', error); 
  //       alert('送信失敗');
  //   };
  // };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('登録失敗');
      }

      const data = await response.json();
      alert('確認メール送信');
      router.push('/signup/thanks');
    } catch (error) {
      console.error('登録エラー:', error);
      alert('登録失敗');
    }
  };

  return (
    <Wrapper size={600}>
      <div className={styles.signup}>
        <div className={styles.cap}>
          <span>NEW</span>
          <h2>新規登録</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.signupInner}>
            <label htmlFor="email">
              メールアドレス
            </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            <label htmlFor="password">
              パスワード
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className={styles.btnArea}>
            <button type="submit" disabled={isSubmitting}>登録</button>
          </div>
        </form>
        <div className={styles.textArea}>
          <p>※すでに登録がお済の方は<Link href='/login'>こちら</Link>からログインしてください。</p>
          <p>※なお、動作確認は<Link href='/'>テストページ</Link>からご覧いただけます。</p>
        </div>
      </div>
    </Wrapper>
  )
}