'use-client';

import React,{ useState } from 'react';
import styles from './index.module.scss';
import { FaqAreaProps } from '../../_types/FaqAreaProps';

export default function FaqArea({ toggle, question, answer }: FaqAreaProps) {
  const [toggleValue, setToggleValue] = useState(toggle);

  const handleClick = () => {
    setToggleValue(toggleValue === '−' ? '+' : '−');
  };

  return (
    <>
      <div className={styles.FaqArea}>
        <div className={styles.FaqQuestion}>
          <p className={styles.QuestionText}>
            <span>Q</span>{question}
          </p>
          <input className={styles.AccordionBtn} type="button" value={toggle} onClick={handleClick} />
        </div>
        {toggleValue === '+' && (
        <div className={styles.FaqAnswer}>
          <span>A</span>{answer}
        </div>
        )}
      </div>
    </>
  );
};