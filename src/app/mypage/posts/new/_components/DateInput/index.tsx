'use-client';

import React, { Dispatch, SetStateAction, useEffect }  from 'react';
import { Label } from '@/app/_components/Label';
import styles from '@/app/mypage/posts/new/_components/DateInput/index.module.scss';

// 日付の型を定義
interface DateProps {
  year: string,
  setYear: Dispatch<SetStateAction<string>>,
  month: string,
  setMonth: Dispatch<SetStateAction<string>>,
  day: string,
  setDay: Dispatch<SetStateAction<string>>,
  hour: string,
  setHour: Dispatch<SetStateAction<string>>,
  minutes: string,
  setMinutes: Dispatch<SetStateAction<string>>,
  setCreatedAt: Dispatch<SetStateAction<string>>,
}

export const DateInput: React.FC<DateProps> = ({
  year, setYear,
  month, setMonth,
  day, setDay,
  hour, setHour,
  minutes, setMinutes,
  setCreatedAt
}) => {

  useEffect(() => {
    const formattedCreatedAt = `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
    setCreatedAt(formattedCreatedAt);
  }, [year, month, day, hour, minutes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'year') {
      setYear(value);
      return;
    }
    if (name === 'month') {
      setMonth(value);
      return;
    }
    if (name === 'day') {
      setDay(value);
      return;
    }
    if (name === 'hour') {
      setHour(value);
      return;
    }
    if (name === 'minutes') {
      setMinutes(value);
      return;
    }
};

  return (
    <div className={styles.date}>
      <Label value='投稿日' />
      <div className={styles.inner}>
        <div className={styles.year}>
        <input
          type='text'
          name='year'
          id='year'
          className={styles.Input}
          value={year}
          onChange={handleChange}
        />
          <span>年</span>
        </div>
        <div className={styles.month}>
        <input
            type='text'
            name='month'
            id='month'
            className={styles.Input}
            value={month}
            onChange={handleChange}
          />
          <span>月</span>
        </div>
        <div className={styles.day}>
        <input
            type='text'
            name='day'
            id='day'
            className={styles.Input}
            value={day}
            onChange={handleChange}
          />
          <span>日</span>
        </div>
        <div className={styles.time}>
        <input
            type='text'
            name='hour'
            id='hour'
            className={styles.Input}
            value={hour}
            onChange={handleChange}
          />
          <span>:</span>
          <input
            type='text'
            name='minutes'
            id='minutes'
            className={styles.Input}
            value={minutes}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};