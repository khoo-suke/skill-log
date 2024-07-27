'use client';

import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'next/navigation';

export const Breadcrumb = () => {
  const { id } = useParams();

  return (
    <>
      <div className={styles.breadcrumb}>
        <Link href={`/mypage/posts/${id}`}>
          <FontAwesomeIcon icon={faAnglesRight} />記事ページに戻る
        </Link>
      </div>
    </>
  );
};