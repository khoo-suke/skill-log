'use-client';

import React from 'react';
import { Wrapper } from '@/app/_components/Wrapper';
import styles from '@/app/mypage/_components/CalenderArea/index.module.scss';
import { CustomCalendar } from './_components/CustomCalender';
import { AverageStudyTime } from './_components/AverageStudyTime';
import { StudyCustomModal } from './_components/StudyCustomModal';
import { useCalender } from '@/app/_hooks/useCalender';

export const CalendarArea = () => {
  const {
    modalOpen,
    averageStudyTime,
    getStudyTimes,
    selectedDate,
    handleMonthChange,
    handleCalendarClick,
    setModalOpen,
  } = useCalender();

  return (
    <div className={styles.calendarArea}>
      <Wrapper size={800}>
        <div className={styles.flexBox}>
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
            {selectedDate &&
              <StudyCustomModal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                selectedDate={selectedDate}
              />
            }
          </div>
          <div className={styles.averageStudyTime}>
            <AverageStudyTime
              averageStudyTime={averageStudyTime}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
