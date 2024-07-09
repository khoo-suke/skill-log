'use-client';

import React, { useState } from 'react';
import { Label } from '@/app/_components/Label';
import { Input } from '@/app/_components/Input';

// onTitleの型を定義
interface TitleProps {
  onTitle: (title: string) => void;
}

export const Title: React.FC<TitleProps> = ({ onTitle }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (createTitle: string) => {
    setTitle(createTitle);
    onTitle(createTitle); // 親コンポーネントにタイトルを渡す
  };


  return (
    <>
      <Label value='タイトル' />
      <Input
        type={'text'}
        name={'title'}
        id={'title'}
        value={title}
        onChange={handleTitleChange}
      />
    </>
  );
};