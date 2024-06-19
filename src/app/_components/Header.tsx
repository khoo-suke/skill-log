'use client';

import style from '@/app/_styles/Header.module.scss';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import Button from './Button';

type HeaderProps = {
  pattern: 'default' | 'thanks';
};

const HeaderDefault: React.FC = () => {
  const { session, isLoding } = useSupabaseSession();

  return (
  <>
    {!isLoding && (
        <header className={style.header}>
        {session ? (
          <>
          <Link href="/mypage" className={style.headerLogo}>
            <Image src="/images/header_logo.png" alt="skill-log" width={132} height={27}/>
          </Link>
          <div className={style.btnAera}>
            <Link href="/mypage/posts/new" className={style.login}>
              新規投稿
            </Link>
            <Link href="/" className={style.new}>
              テスト
            </Link>
          </div>
          </>
        ) : (
          <>
          <Link href="/" className={style.headerLogo}>
            <Image src="/images/header_logo.png" alt="skill-log" width={132} height={27}/>
          </Link>
          <div className={style.btnAera}>
            <Link href="/login" className={style.login}>
              ログイン
           </Link>
            <Link href="/signup" className={style.new}>
              新規登録
           </Link>
           </div>
          </>
        )}
    </header>
      )}
   </>
  )
}


const HeaderThanks: React.FC = () => (
  <header className={style.header}>
    <Link href="/mypage" className={style.headerLogo}>
      <Image src="/images/header_logo.png" alt="skill-log" width={132} height={27}/>
    </Link>
  </header>
);

const Header: React.FC<HeaderProps> = ({ pattern }) => {
  return (
    <>
      {pattern === 'default' && <HeaderDefault />}
      {pattern === 'thanks' && <HeaderThanks />}
    </>
  );
};

export default Header;