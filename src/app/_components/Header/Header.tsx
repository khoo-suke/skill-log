'use client';

import '../../_styles/Header.scss';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'

const Header = () => {
  return (
    <header className='header'>
      <Link href="/" className='headerLogo'>
        <Image src="/images/header_logo.png" alt="skill-log" width={132} height={27}/>
      </Link>
      <div className='btnAera'>
        <Link href="/login" className="login">
          ログイン
        </Link>
        <Link href="/signup" className="new">
          新規登録
        </Link>
      </div>
    </header>
  )
}

export default Header;