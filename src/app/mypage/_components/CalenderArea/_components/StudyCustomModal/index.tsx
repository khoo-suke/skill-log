'use-client';

import React from 'react';
import { CustomModal } from '@/app/_components/CustomModal';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/app/_components/Button';
import { Label } from '@/app/_components/Label';
import { format } from 'date-fns';

// 親からステートを受け取る
interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedDate: Date | null;
  studyTime: string;
  onStudyTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const StudyCustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  selectedDate,
  studyTime,
  onStudyTimeChange,
  onSubmit,
}) => {

  
  // モーダル内の日付表示をフォーマット
  const formatDate = (date: Date) => {
    return format(date, 'yyyy年MM月dd日');
  };

  return (
    <>
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
    >
      <div>
        <button onClick={onRequestClose}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </div>
      {selectedDate && <h2>登録日時：{formatDate(selectedDate)}</h2>}
      <Label value="勉強時間" />
      <input
        type="text"
        value={studyTime}
        onChange={onStudyTimeChange}
      /><span>(h)</span>
      <Button
        type="button"
        color="pink"
        size="small"
        onClick={onSubmit}
      >
        登録
      </Button>
    </CustomModal>
    </>
  )
}