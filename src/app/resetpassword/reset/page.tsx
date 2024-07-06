'use client';

import styles from '@/app/resetpassword/sendmail/_styles/resetPassword.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/_components/Button';
import Wrapper from '@/app/_components/Wrapper';
import Input from '@/app/_components/Input';
import Label from '@/app/_components/Label';

export default function Page() {
  const router = useRouter();
  const [password, setPassword] = useState('');


  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/resetpassword/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

    if (!response.ok) {
        throw new Error(`パスワード再設定失敗`);
    };

      alert('パスワードを更新しました');
      router.push('/login'); 
    } catch (error) {
      console.error('パスワード再設定エラー:', error);
      alert('パスワード再設定失敗');
    };
  };

  return (
    <>
      <div className={styles.reset}>
        <Wrapper size={600}>
          <div className={styles.cap}>
            <span>RESET PASSWORD</span>
            <h2>パスワード再登録画面</h2>
          </div>
        </Wrapper>
        <Wrapper size={700}>
          <form onSubmit={handleSubmitPassword} className={styles.form}>
            <div className={styles.resetInner}>
              <Label value='新しいパスワード' htmlfor='password' />
              <Input
                type={'password'}
                name={'password'}
                id={'password'}
                value={password}
                placeholder={'••••••••'}
                required
                onChange={value => setPassword(value)}
              />
            </div>
            <div className={styles.btnArea}>
              <Button isLink={false} type="submit" color={"pink"} size={"middle"}>
                パスワード変更
              </Button>
            </div>
          </form>
        </Wrapper>
      </div>
    </>
  );
};
