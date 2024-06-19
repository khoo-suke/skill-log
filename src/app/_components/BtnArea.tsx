'use client';

import style from '@/app/_styles/BtnArea.module.scss';
import Link from 'next/link';
import React from 'react';

const BtnAera = () => {
  return (
    <div className={style.btnArea}>
      <Link href="/login" className={style.login}>
        ログイン
      </Link>
      <Link href="/signup" className={style.new}>
        今すぐはじめる
      </Link>
    </div>
  )
}

export default BtnAera;