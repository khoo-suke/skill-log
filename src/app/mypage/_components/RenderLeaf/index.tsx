'use client';

import React, { useEffect, useRef } from 'react';
import { RenderLeafProps } from 'slate-react';
import styles from '@/app/mypage/_components/RenderLeaf/index.module.scss';
import Link from 'next/link';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export const RenderLeaf = (props: RenderLeafProps) => {
  
  let { attributes, children, leaf } = props;
  
  // コードハイライト
  const codeRef = useRef(null);

  useEffect(() => {
    if (leaf.code && codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [leaf.code, children]);

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.code) {
    children = <code ref={codeRef}>{children}</code>;
  }
  if (leaf.link) {
    return (
      <Link href={children.props.leaf.text} {...attributes} className={`custom-leaf ${styles.link}`}>
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