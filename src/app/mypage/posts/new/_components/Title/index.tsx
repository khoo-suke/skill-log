'use-client';

import React, { Dispatch, SetStateAction } from 'react';
import { Label } from '@/app/_components/Label';
import styles from './index.module.scss';

// 型を定義
interface TitleProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export const Title = ({ title, setTitle }: TitleProps) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <Label value='タイトル' />
      <input
        type='text'
        name='title'
        id='title'
        className={styles.Input}
        value={title}
        onChange={handleTitleChange}
      />
    </>
  );
};