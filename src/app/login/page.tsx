'use client';

import styles from '@/app/login/_styles/Login.module.scss';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import Button from '../_components/Button';
import Wrapper from '../_components/Wrapper';

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(`ログイン失敗: ${error.message}`)
    } else {
      router.replace('/mypage')
    }
  }

  return (
    <>
    <div className={styles.login}>
      <Wrapper size={600}>
        <div className={styles.cap}>
          <span>LOGIN</span>
          <h2>ログイン</h2>
        </div>
      </Wrapper>
      <Wrapper size={700}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.loginInner}>
            <label htmlFor="email">
              ID(メールアドレス)
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">
              パスワード
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.btnArea}>
            <Button isLink={false} type="submit" color={"pink"}>
              ログイン
            </Button>
          </div>
          </form>
      </Wrapper>
      <Wrapper size={600}>
        <div className={styles.textArea}>
          <p>※パスワードお忘れの方は<Link href='/login'>こちら</Link>からパスワードを再設定してください。</p>
          <p>※アカウントをお持ちでない方は<Link href='/'>こちら</Link>こちらからユーザー登録をしてください。</p>
          <p>※なお、動作確認は<Link href='/'>テストページ</Link>からご覧いただけます。</p>
        </div>
      </Wrapper >
    </div>
    </>
  )
}