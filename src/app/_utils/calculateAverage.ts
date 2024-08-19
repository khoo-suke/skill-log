import { isWithinInterval } from "date-fns";

interface StudyTime {
  date: Date;
  studyTime: number;
}

export const calculateAverage = (
  studyTimes: StudyTime[],
  startMonthDate: Date,
  endMonthDate: Date,
  now: Date
) => {
  // 現在の日付までのデータをフィルタリング
  const filteredStudyTimes = studyTimes.filter((entry: StudyTime) => {
    const entryDate = new Date(entry.date);
    return (
      isWithinInterval(entryDate, {
        start: startMonthDate,
        end: endMonthDate,
      }) && entryDate <= now
    );
  });

  // 現在の日付がフィルタリングした月内にあるかどうかを確認
  const isCurrentMonth = now >= startMonthDate && now <= endMonthDate;

  // 平均値を計算する際の分母を決定
  const daysInMonth = endMonthDate.getDate();
  const divisor = isCurrentMonth ? now.getDate() : daysInMonth;

  // 現在の日付までのデータを基に勉強時間を合計
  const totalStudyTime = filteredStudyTimes.reduce(
    (total: number, entry: StudyTime) => total + entry.studyTime,
    0
  );

  // 平均値を出す
  return (totalStudyTime / divisor).toFixed(1);
};
