'use client';

import '../../_styles/BtnArea.scss';
import Link from 'next/link';
import React from 'react';

const BtnAera = () => {
  return (
    <div className='btnAera'>
      <Link href="/login" className="login">
        ログイン
      </Link>
      <Link href="/signup" className="new">
        今すぐはじめる
      </Link>
    </div>
  )
}

export default BtnAera;