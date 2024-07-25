'use-client';

import React, { useState, useEffect } from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Wrapper } from '@/app/_components/Wrapper';
import styles from '@/app/mypage/_components/CalenderArea/index.module.scss';
import { CustomCalendar } from './_components/CustomCalender';
import { AverageStudyTime } from './_components/AverageStudyTime';
import { StudyCustomModal } from './_components/StudyCustomModal';

// 型を定義
interface StudyTimeEntry {
  date: string,
  studyTime: number,
};

export const CalendarArea = () => {
  const { token } = useSupabaseSession();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isStudyTime, setIsStudyTime] = useState<string>('');
  const [averageStudyTime, setAverageStudyTime] = useState<string>('');
  const [getStudyTimes, setGetStudyTimes] = useState<StudyTimeEntry[]>([]);

  // GET 勉強時間取得
  const fetchStudyTimeData = async () => {
    try {
      if (!token) return [];
      const response = await fetch(`/api/studyTime`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error('勉強時間の取得エラー');
      };

      const data = await response.json();

      // 平均勉強時間をセット
      setAverageStudyTime(data.averageStudyTime);

      // 勉強時間をセット
      setGetStudyTimes(data.studyTimes);

    } catch (error) {
      console.error(error);
    };
  };

  // 初回ロード・token変更時に取得
  useEffect(() => {
    fetchStudyTimeData();
  }, [token]);
  

  // 既に値がある場合はモーダル内の勉強時間入力欄の値を設定
  useEffect(() => {
    if (selectedDate) {
      const existingEntry = getStudyTimes.find(
        (entry) => new Date(entry.date).toDateString() === selectedDate.toDateString()
      );
      if (existingEntry) {
        setIsStudyTime(existingEntry.studyTime.toString());
      } else {
        setIsStudyTime(''); // 存在しない場合は空
      };
    };
  }, [selectedDate, getStudyTimes]);

  
  // POST or PUT 勉強時間登録・更新
  const handleStudyTime = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) return;

    if (!isStudyTime) {
      alert('勉強時間が未入力です');
      return;
    };

    // studyTimeの型をnumberに変換 10進数に
    const studyTimeNumber = parseInt(isStudyTime, 10);
    if (isNaN(studyTimeNumber)) {
      alert('勉強時間は半角数字で入力してください');
      return;
    };

    // すでに登録されているデータの抽出
    const existingEntry = getStudyTimes.find(
      (entry) => new Date(entry.date).toDateString() === selectedDate?.toDateString()
    );

    // PUTリクエストの場合に確認メッセージを表示
    if (existingEntry) {
      const userConfirmed = window.confirm('この日の勉強時間を更新しますか？');

      if (!userConfirmed) {
        return; // キャンセル
      };
    };

    // PUTリクエストとPOSTリクエストの条件分岐
    const method = existingEntry ? 'PUT' : 'POST';

    try {
      const response = await fetch(`/api/studyTime`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          studyTime: studyTimeNumber,
          date: selectedDate,
        }),
      });

      if (!response.ok) {
        throw new Error('勉強時間の登録・更新に失敗');
      };

      await response.json();
      setIsStudyTime('');
      setModalOpen(false); // modalを閉じる

      // 勉強時間データを再取得
      fetchStudyTimeData();

      } catch (error) {
        console.error(error);
      };
  };
  
    // カレンダー日付クリック時
    const handleCalendarClick = (date: Date) => {
      setSelectedDate(date);
      setModalOpen(true);
    };

  return (
    <div className={styles.calendarArea}>
      <Wrapper size={800}>
        <div className={styles.flexBox}>
          <div className={styles.calendar}>
            <CustomCalendar
              getStudyTimes={getStudyTimes}
              onCalendarClick={handleCalendarClick}

            />
            <div className={styles.guide}>
              <span>少</span>
              <button className={styles.zero}></button>
              <button className={styles.low}></button>
              <button className={styles.medium}></button>
              <button className={styles.high}></button>
              <button className={styles.veryHigh}></button>
              <span>多</span>
            </div>
            <StudyCustomModal
              isOpen={modalOpen}
              onRequestClose={() => setModalOpen(false)}
              selectedDate={selectedDate}
              studyTime={isStudyTime}
              onStudyTimeChange={(e) => setIsStudyTime(e.target.value)}
              onSubmit={handleStudyTime}
            />
          </div>
          <AverageStudyTime
            averageStudyTime={averageStudyTime}
          />
        </div>
      </Wrapper>
    </div>
  );
};
