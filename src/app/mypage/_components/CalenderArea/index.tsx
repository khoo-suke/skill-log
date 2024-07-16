'use-client';

import React, { useState, useEffect } from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Wrapper } from '@/app/_components/Wrapper';
import styles from '@/app/mypage/_components/CalenderArea/index.module.scss';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
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
  const fetchStudyTimeData = async (): Promise<StudyTimeEntry[]> => {
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
      return data.studyTimes || [];
    } catch (error) {
      console.error(error);
      return [];
    };
  };

  // 平均勉強時間を呼び出し
  useEffect(() => {
    averageStudyTimeData();
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

  // 平均勉強時間を計算
  const averageStudyTimeData = async () => {
    const data = await fetchStudyTimeData();

    // 現在の日にち
    const now = new Date();

    // 月初と月末の日にち
    const startMonthDate = startOfMonth(now);
    const endMonthDate = endOfMonth(now);

    // 1か月のデータをフィルタリング
    const oneMonthData = data.filter((entry: StudyTimeEntry) => {
      const entryDate = new Date(entry.date);
      return isWithinInterval(entryDate, { start: startMonthDate, end: endMonthDate });
    });

    // 過去1か月の勉強時間を合計
    const totalStudyTime = oneMonthData.reduce((total: number, entry: StudyTimeEntry) => total + entry.studyTime, 0);
    console.log(totalStudyTime);

    // 今月の日数で割って平均値を出す
    const currentDayOfMonth = now.getDate();
    const averageTime = totalStudyTime / currentDayOfMonth;
    console.log(averageTime);

    // 数値を文字列に変換 小数点第1位まで表示
    const averageStudyTimeString = averageTime.toFixed(1);
    setAverageStudyTime(averageStudyTimeString);

    // クラス名付与の関数を渡す
    setGetStudyTimes(data);
  };

  // POST or PUT 勉強時間登録・更新
  const handleStudyTime = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) return;

    if (!isStudyTime) {
      alert('勉強時間が未入力です');
      return;
    }

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

      // 平均勉強時間を計算
      averageStudyTimeData();

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
          <AverageStudyTime averageStudyTime={averageStudyTime} />
        </div>
      </Wrapper>
    </div>
  );
};
