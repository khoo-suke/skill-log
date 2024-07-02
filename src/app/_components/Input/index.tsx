'use client';

import React from 'react';
import styles from '@/app/_components/Input/index.module.scss';

interface InputProps {
  type: 'text' | 'password' | 'email' | 'button';
  name: string;
  id: string;
  onChange?: (value: string) => void;
  value?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
};

const Input: React.FC<InputProps> = ({ type = 'text', name, id, onChange, value, placeholder, defaultValue }) => {
  
  return <input
          type={type}
          name={name}
          id={id}
          className={styles.Input}
          value={value}
          placeholder={placeholder}
          required={!!defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
          defaultValue={defaultValue}
          />
};

export default Input;