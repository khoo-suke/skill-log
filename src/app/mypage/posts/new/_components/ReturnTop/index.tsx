'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/app/mypage/posts/new/_components/ReturnTop/index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';


export const ReturnTop = () => {
  
  return (
    <>
      <div className={styles.topLink}>
        <Link href="/mypage">
          <FontAwesomeIcon icon={faAnglesRight} />トップページに戻る
        </Link>
      </div>
    </>
  );
};