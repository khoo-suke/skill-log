'use client';

import React from 'react';
import styles from '@/app/_components/Button/index.module.scss';
import Link from 'next/link';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset',
  color?: 'black' | 'white' | 'pink',
  size?: 'large' | 'middle' | 'small',
  children: React.ReactNode,
  isLink?: boolean,
  href?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
};

export const Button: React.FC<ButtonProps> = ({ type = 'button', color = 'black', size = 'middle', children, isLink, href, onClick }) => {
  const Color = () => {
    switch (color) {
      case 'black':
        return styles.black;
      case 'white':
        return styles.white;
      case 'pink':
        return styles.pink;
      default:
        return styles.black;
    };
  };

  const Size = () => {
    switch (size) {
      case 'large':
        return styles.large;
      case 'middle':
        return styles.middle;
      case 'small':
        return styles.small;
      default:
        return styles.middle;
    };
  };

  if (isLink && href) {
    return (
      <Link href={href} className={`${Color()} ${Size()}`}>
        {children}
      </Link>
    );
  };

  return (
    <button type={type} className={`${Color()} ${Size()}`} onClick={onClick}>
      {children}
    </button>
  );
};