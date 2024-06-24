'use client';

import styles from './_styles/Signup.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Wrapper from '../_components/Wrapper';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
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
            <button type="submit">登録</button>
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