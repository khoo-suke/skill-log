'use-client';

import React, { useEffect, useState } from 'react';
import { Label } from '@/app/_components/Label';
import { Input } from '@/app/_components/Input';
import styles from '@/app/mypage/posts/new/_components/DateInput/index.module.scss';

// 日付の型を定義
interface DateProps {
  onYear: (year: string) => void,
  onMonth: (month: string) => void,
  onDay: (day: string) => void,
  onHour: (hour: string) => void,
  onMinutes: (minutes: string) => void,
}

export const DateInput: React.FC<DateProps> = ({ onYear, onMonth, onDay, onMinutes }) => {
  const [createdAt, setCreatedAt] = useState('');
  const [year, setYear] = useState(String(new Date(createdAt).getFullYear()));
  const [month, setMonth] = useState(String(new Date(createdAt).getMonth() + 1));
  const [day, setDay] = useState(String(new Date(createdAt).getDate()));
  const [hour, setHour] = useState(String(new Date(createdAt).getHours()));
  const [minutes, setMinutes] = useState(String(new Date(createdAt).getMinutes()));

  // 現在の時間を取得
  useEffect(() => {
    const now = new Date();
    const defaultDate = now.toISOString();
    setCreatedAt(defaultDate);
    setYear(String(now.getFullYear()));
    setMonth(String(now.getMonth() + 1));
    setDay(String(now.getDate()));
    setHour(String(now.getHours()));
    setMinutes(String(now.getMinutes()));
  }, []);

  const handleYearChange = (createYear: string) => {
    setYear(createYear);
    onYear(createYear); // 親コンポーネントに渡す
  }

  return (
    <div className={styles.date}>
      <Label value='投稿日' />
      <div className={styles.inner}>
        <div className={styles.year}>
          <Input
            type={'text'}
            name={'year'}
            id={'year'}
            value={year}
            onChange={handleYearChange}
          />
          <span>年</span>
        </div>
        <div className={styles.month}>
          <Input
            type={'text'}
            name={'month'}
            id={'month'}
            value={month}
          />
          <span>月</span>
        </div>
        <div className={styles.day}>
          <Input
            type={'text'}
            name={'day'}
            id={'day'}
            value={day}
          />
          <span>日</span>
        </div>
        <div className={styles.time}>
          <Input
            type={'text'}
            name={'hour'}
            id={'hour'}
            value={hour}
          />
          <span>:</span>
          <Input
            type={'text'}
            name={'minutes'}
            id={'minutes'}
            value={minutes}
          />
        </div>
      </div>
    </div>
  );
};