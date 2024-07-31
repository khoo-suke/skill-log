'use-client';

import React, { useState, useEffect } from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

// 型を定義
interface StudyTimeEntry {
  date: string,
  studyTime: number,
}

export const useCalender = () => {
  const { token } = useSupabaseSession();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isStudyTime, setIsStudyTime] = useState<string>("");
  const [averageStudyTime, setAverageStudyTime] = useState<string>("");
  const [getStudyTimes, setGetStudyTimes] = useState<StudyTimeEntry[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );

  // GET 勉強時間取得
  const fetchStudyTimeData = async () => {
    try {
      if (!token) return [];
      const response = await fetch(`/api/studyTime`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("勉強時間の取得エラー");
      }

      const data = await response.json();

      // 平均勉強時間をセット
      setAverageStudyTime(data.averageStudyTime);

      // 勉強時間をセット
      setGetStudyTimes(data.studyTimes);
    } catch (error) {
      console.error(error);
    }
  };

  // 初回ロード・token変更時に取得
  useEffect(() => {
    fetchStudyTimeData();
  }, [token, currentYear, currentMonth]);

  // 月が変更されたとき
  const handleMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  // 既に値がある場合はモーダル内の勉強時間入力欄の値を設定
  useEffect(() => {
    if (selectedDate) {
      const existingEntry = getStudyTimes.find(
        (entry) =>
          new Date(entry.date).toDateString() === selectedDate.toDateString()
      );
      if (existingEntry) {
        setIsStudyTime(existingEntry.studyTime.toString());
      } else {
        setIsStudyTime(""); // 存在しない場合は空
      }
    }
  }, [selectedDate, getStudyTimes]);

  // POST or PUT 勉強時間登録・更新
  const handleStudyTime = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) return;

    if (!isStudyTime) {
      alert("勉強時間が未入力です");
      return;
    }

    // studyTimeの型をnumberに変換 10進数に
    const studyTimeNumber = parseInt(isStudyTime, 10);
    if (isNaN(studyTimeNumber)) {
      alert("勉強時間は半角数字で入力してください");
      return;
    }

    // すでに登録されているデータの抽出
    const existingEntry = getStudyTimes.find(
      (entry) =>
        new Date(entry.date).toDateString() === selectedDate?.toDateString()
    );

    // PUTリクエストの場合に確認メッセージを表示
    if (existingEntry) {
      const userConfirmed = window.confirm("この日の勉強時間を更新しますか？");

      if (!userConfirmed) {
        return; // キャンセル
      }
    }

    // PUTリクエストとPOSTリクエストの条件分岐
    const method = existingEntry ? "PUT" : "POST";

    try {
      const response = await fetch(`/api/studyTime`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          studyTime: studyTimeNumber,
          date: selectedDate,
        }),
      });

      if (!response.ok) {
        throw new Error("勉強時間の登録・更新に失敗");
      }

      await response.json();
      setIsStudyTime("");
      setModalOpen(false); // modalを閉じる

      // 勉強時間データを再取得
      fetchStudyTimeData();
    } catch (error) {
      console.error(error);
    }
  };

  // カレンダー日付クリック時
  const handleCalendarClick = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  return {
    selectedDate,
    modalOpen,
    isStudyTime,
    averageStudyTime,
    getStudyTimes,
    currentYear,
    currentMonth,
    handleMonthChange,
    handleStudyTime,
    handleCalendarClick,
    setModalOpen,
    setIsStudyTime,
  };
};
