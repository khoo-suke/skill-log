'use-client';

import React,{ useState } from 'react';
import styles from './index.module.scss';
import { FaqAreaProps } from '../../_types/FaqAreaProps';

export default function FaqArea({ boolean, question, answer }: FaqAreaProps) {
  const [isOpen, setIsOpen] = useState(boolean);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <div className={styles.FaqArea}>
        <div className={styles.FaqQuestion}>
          <p className={styles.QuestionText}>
            <span>Q</span>{question}
          </p>
          <button
            className={styles.AccordionBtn}
            onClick={handleClick}
          >
            {isOpen ? '−' : '+'}
          </button>
        </div>
        <div className={`${styles.FaqAnswer} ${isOpen ? styles.active : ''}`}>
        {isOpen && (
          <p>
          <span>A</span>{answer}
          </p>
          )}
        </div>
      </div>
    </>
  );
};