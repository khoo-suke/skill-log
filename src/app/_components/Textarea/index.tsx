'use client';

import React from 'react';
import styles from '@/app/_components/Textarea/index.module.scss';

interface TextareaProps {
  id: string;
  cols?: number;
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const Textarea: React.FC<TextareaProps> = ({ id, cols, rows, placeholder, value, onChange }) => {
  
  return <textarea
          id={id}
          cols={cols}
          rows={rows}
          className={styles.Textarea}
          value={value}
          placeholder={placeholder}
          required
          onChange={(e) => onChange?.(e.target.value)}
          />
};

export default Textarea;