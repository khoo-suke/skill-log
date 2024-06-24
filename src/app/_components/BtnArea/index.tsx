'use client';

import styles from '@/app/_components/BtnArea/index.module.scss';
import Link from 'next/link';
import React from 'react';
import Button from '../Button';

const BtnAera = () => {
  return (
    <>
      <div className={styles.btnAera}>
        <Button isLink={true} href={"/login"} color={"black"} size={"large"}>
          ログイン
        </Button>
        <Button isLink={true} href={"/signup"} color={"pink"} size={"large"}>
          今すぐはじめる
        </Button>
      </div>
    </>
  )
}

export default BtnAera;