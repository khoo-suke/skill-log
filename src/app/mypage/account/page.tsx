'use client';

import React from 'react';
import styles from './_styles/Account.module.scss';
import { Wrapper } from '@/app/_components/Wrapper';
import Link from 'next/link';
import { Button } from '@/app/_components/Button';
import { Input } from '@/app/_components/Input';
import { Textarea } from './_compornent/Textarea';
import { Label } from '@/app/_components/Label';
import { SplitArea } from './_compornent/SplitArea';
import { useProfile } from '@/app/_hooks/useProfile';

export default function Account() {
  // フックから値取得
  const {
    name,
    setName,
    email,
    setEmail,
    goal,
    setGoal,
    handleSubmit,
    profileImageUrl,
    handleFabClick,
  } = useProfile();

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
          <SplitArea
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            profileImageUrl={profileImageUrl}
            handleFabClick={handleFabClick}
          />
          <div className={styles.Label}>
          <Label value='パスワード'/>
            <Input
              name={'password'}
              id={'password'}
              type={'password'}
              value={'••••••••'}
            />
            {/* <p>※パスワードはこの画面からは変更できません。変更したい場合は<Link href="">こちら</Link>のページから再設定してください。</p> */}
          </div>
          <div className={styles.Label}>
            <label>目標</label>
            <Textarea
              id={'goal'}
              cols={30}
              rows={4}
              value={goal ?? ""}
              onChange={setGoal}
            />
          </div>
          <div className={styles.btnArea}>
            <Button type='submit' color='black' size='middle'>更新</Button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};