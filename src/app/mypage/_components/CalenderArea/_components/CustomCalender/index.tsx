'use client';

import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/app/mypage/_components/CalenderArea/_components/CustomCalender/customCalender.scss";

// 型を定義
interface StudyTimeEntry {
  date: string;
  studyTime: number;
}

// 親からステートを受け取る
interface CalendarComponentProps {
  getStudyTimes: StudyTimeEntry[];
  onCalendarClick: (date: Date) => void;
  onMonthChange: (year: number, month: number) => void;
}

export const CustomCalendar: React.FC<CalendarComponentProps> = ({ getStudyTimes, onCalendarClick, onMonthChange }) => {
  const [date, setDate] = useState(new Date());

  // クラス名を生成
  const getClassByStudyTime = (studyTime: number) => {
    if (studyTime === 0) return 'zero';
    if (studyTime > 0 && studyTime <= 1) return 'low';
    if (studyTime > 1 && studyTime <= 3) return 'medium';
    if (studyTime > 3 && studyTime <= 5) return 'high';
    if (studyTime > 5) return 'very-high';
    return '';
  };

  // 日付にクラスを付与
  const tileClassName = useCallback(({ date }: { date: Date }) => {
    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth();

    // 現在の月の場合のみクラスを付与
    if (dateYear === date.getFullYear() && dateMonth === date.getMonth()) {
      const studyTimeEntry = getStudyTimes.find(entry => new Date(entry.date).toDateString() === date.toDateString());
      if (studyTimeEntry) {
        const className = getClassByStudyTime(studyTimeEntry.studyTime);
        return className;
      }
    }
    return '';
  }, [getStudyTimes]);

  // 月変更時に呼ばれる
  const handleMonthChange = useCallback((value: Date) => {
    if (value instanceof Date) {
      setDate(value);
      const year = value.getFullYear();
      const month = value.getMonth() + 1; // 月は1から始まる
      onMonthChange(year, month);
    }
  }, [onMonthChange]);

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は1から始まる
    onMonthChange(year, month);
  }, [date, onMonthChange]);

  return (
    <Calendar
      locale="ja-JP"
      onClickDay={onCalendarClick}
      tileClassName={tileClassName}
      prev2Label={null} //前年のボタン非表示
      next2Label={null} //翌年のボタン非表示
      minDetail="month"
      maxDetail="month"
      showNeighboringMonth={false}
      onActiveStartDateChange={({ activeStartDate }) => {
        if (activeStartDate instanceof Date) {
          handleMonthChange(activeStartDate);
        }
      }}
    />
  );
};