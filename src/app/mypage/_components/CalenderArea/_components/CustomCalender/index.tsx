"use-client";

import React from "react";
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
};

export const CustomCalendar: React.FC<CalendarComponentProps> = ({ getStudyTimes, onCalendarClick }) => {

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

  return (
    <Calendar
      locale="ja-JP"
      onClickDay={onCalendarClick}
      tileClassName={tileClassName}
      
    />
  );
};