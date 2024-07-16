'use-client';

import React from 'react';
import styles from '@/app/mypage/_components/CalenderArea/_components/AverageStudyTime/index.module.scss';

// 親からステートを受け取る
interface AverageStudyTimeProps {
  averageStudyTime: string;
};

export const AverageStudyTime: React.FC<AverageStudyTimeProps> = ({ averageStudyTime }) => {
  return (
    <div className={styles.studyTime}>
      <h2>平均勉強時間</h2>
      {/* <div>
        <span>期間設定:</span>
      </div> */}
      <div>
        <p><strong>{averageStudyTime !== null ? `${averageStudyTime}h` : 'データなし'}</strong>(月平均)</p>
      </div>
    </div>
  );
};

