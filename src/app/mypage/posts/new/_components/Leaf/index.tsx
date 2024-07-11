'use client';

import React from 'react';
import { RenderLeafProps } from 'slate-react';
import { CustomText } from '../../_types/CustomText';



// RenderLeafProps にカスタムプロパティ leaf を追加するための Intersection Types
type LeafProps = RenderLeafProps & {
  leaf: CustomText;
};

// Leaf コンポーネントを定義する
const Leaf: React.FC<LeafProps> = ({ attributes, children, leaf }) => {
  const styles: React.CSSProperties = {
    padding: '0.1em 0',
    margin: '0 1px',
    verticalAlign: 'baseline',
    display: 'inline-block',
    fontSize: '0.9em',
  };

  // 太字
  if (leaf.bold) {
    styles.fontWeight = 'bold';
  }
  // イタリック
  if (leaf.italic) {
    styles.fontStyle = 'italic';
  }
  // コード
  if (leaf.code) {
    styles.backgroundColor = '#333';
    styles.color = '#fff';
    styles.display = 'block';
    styles.padding = '4px 10px';
  }

  return (
    <span
      {...attributes}
      style={styles}
    >
      {children}
    </span>
  );
};

export default Leaf;