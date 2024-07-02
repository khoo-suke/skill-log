'use client';

import React from 'react';
import styles from '@/app/_components/Label/index.module.scss';

interface LabelProps {
  value: string;
  htmlfor?: string;
}

const Label: React.FC<LabelProps> = ({ value, htmlfor }) => {
  return <label className={styles.label} htmlFor={htmlfor}>{value}</label>
}

export default Label;