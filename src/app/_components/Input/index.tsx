'use client';

import React from "react";
import styles from '@/app/_components/Input/index.module.scss';
import { Button } from "@slack/web-api";

interface InputProps {
  type: 'text' | 'password' | 'email';
  name: string;
  id: string;
  onChange?: (value: string) => void;
  value?: string;
  required?: boolean;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({ type = 'text', name, id,onChange, value, placeholder}) => {
  
  return <input
          type={type}
          name={name}
          id={id}
          className={styles.Input}
          value={value}
          placeholder={placeholder}
          required
          onChange={(e) => onChange?.(e.target.value)}
          />
};

export default Input;