"use-client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/app/mypage/_components/CalenderArea/_components/CustomCalender/customCalender.scss";

// 型を定義
interface StudyTimeEntry {
  date: string;
  studyTime: number;
};

// 親からステートを受け取る
interface CalendarComponentProps {
  getStudyTimes: StudyTimeEntry[];
  onCalendarClick: (date: Date) => void;
  onMonthChange: (year: number, month: number) => void;
};

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
  const tileClassName = ({ date }: { date: Date }) => {
    const studyTimeEntry = getStudyTimes.find(entry => new Date(entry.date).toDateString() === date.toDateString());
    if (studyTimeEntry) {
      const className = getClassByStudyTime(studyTimeEntry.studyTime);
      return className;
    };
    return '';
  };

  // 月変更時に呼ばれる
  const handleMonthChange = (value: Date ) => {
    if (value instanceof Date) { 
      setDate(value);
      const year = value.getFullYear();
      const month = value.getMonth() + 1; // 月は0から始まるため+1
      onMonthChange(year, month);
      console.log(year, month);
    };
  };

  useEffect(() => {
    handleMonthChange(date);
  }, [date]);

  return (
    <Calendar
      locale="ja-JP"
      onClickDay={onCalendarClick}
      tileClassName={tileClassName}
    />
  );
};