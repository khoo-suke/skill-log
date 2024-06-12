'use client';

import '../../_styles/Header.scss';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'

const MypageHeader: React.FC = () => {
  return (
    <header className='header'>
      <Link href="/mypage">
      <Image src="/images/header_logo.png" alt="skill-log" width={132} height={27}/>
      </Link>
      <div className=''>
        <Link href="/login">新規投稿</Link>
        <Link href="/">画像</Link>
        <nav>
          <ul>
            <li><Link href="/">プロフィール設定</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default MypageHeader;