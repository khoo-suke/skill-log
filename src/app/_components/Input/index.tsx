"use client";

import React from "react";
import styles from "@/app/_components/Input/index.module.scss";

interface InputProps {
  type: "text" | "password" | "email" | "button";
  name: string;
  id: string;
  onChange?: (value: string) => void;
  value?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  id,
  onChange,
  value,
  placeholder,
  disabled,
  required,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={styles.Input}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      readOnly={!onChange}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
    />
  );
};
