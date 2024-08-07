'use client';

import React from 'react';
import { RenderLeafProps } from 'slate-react';
import styles from '@/app/mypage/_components/RenderLeaf/index.module.scss';
import Link from 'next/link';

export const RenderLeaf = (props: RenderLeafProps) => {
  let { attributes, children, leaf } = props;

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.link) {
    return (
      <Link href={children} {...attributes} className={`custom-leaf ${styles.link}`}>
        {children}
      </Link>
    );
  }

  return (
    <span
      {...attributes}
      className={`custom-leaf ${leaf.bold ? styles.bold : ''} ${leaf.italic ? styles.italic : ''} ${leaf.code ? styles.code : ''}`}
    >
      {children}
    </span>
  );
};