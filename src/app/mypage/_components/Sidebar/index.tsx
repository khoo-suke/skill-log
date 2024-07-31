'use-client';

import React from 'react';
import styles from './index.module.scss';
import { CustomCalendar } from '@/app/mypage/_components/CalenderArea/_components/CustomCalender';
import { AverageStudyTime } from '@/app/mypage/_components/CalenderArea/_components/AverageStudyTime';
import { StudyCustomModal } from '@/app/mypage/_components/CalenderArea/_components/StudyCustomModal';
import { useCalender } from '@/app/_hooks/useCalender';

export const Sidebar = () => {
  const {
    selectedDate,
    modalOpen,
    isStudyTime,
    averageStudyTime,
    getStudyTimes,
    handleMonthChange,
    handleStudyTime,
    handleCalendarClick,
    setModalOpen,
    setIsStudyTime,
  } = useCalender();

  return (
    <div className={styles.calendarArea}>
      <div className={styles.sticky}>
        <div className={styles.averageStudyTime}>
          <AverageStudyTime
            averageStudyTime={averageStudyTime}
        />
        </div>
        <div className={styles.calendar}>
          <CustomCalendar
            getStudyTimes={getStudyTimes}
            onCalendarClick={handleCalendarClick}
            onMonthChange={handleMonthChange}
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
      </div>
    </div>
  );
};
