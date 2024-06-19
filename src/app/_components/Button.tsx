'use client';

import classNames from 'classnames';
import React from 'react';
import '@/app/_styles/Btn.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: 'black' | 'white' | 'pink';
  text: string;
} 

const Button: React.FC<ButtonProps> = ({ type = 'button', className = 'black', text }) => {

  return (
    <button type={type} className={className}>{text}</button>
  )
}

export default Button;