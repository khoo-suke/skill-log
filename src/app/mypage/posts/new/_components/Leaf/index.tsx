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
  let style: React.CSSProperties = {};

  // 太字
  if (leaf.bold) {
    style.fontWeight = 'bold';
  }
  // イタリック
  if (leaf.italic) {
    style.fontStyle = 'italic';
  }


  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
};

export default Leaf;