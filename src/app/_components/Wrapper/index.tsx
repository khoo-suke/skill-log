'use client';

import React from 'react';
import styles from '@/app/_components/Wrapper/index.module.scss';

interface WrapperProps {
  size: 600 | 700 | 800 | 900 | 1000;
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ size = 1000, children }) => {

  const Size = () => {
    switch (size) {
      case 600:
        return styles.wrapper600;
      case 700:
        return styles.wrapper700;
      case 800:
        return styles.wrapper800;
      case 900:
        return  styles.wrapper900;
      case 1000:
        return styles.wrapper1000;
      default:
        return styles.wrapper1000;
    }
  }

  return (
    <div className={Size()}>
      {children}
    </div>
  )
}

export default Wrapper;