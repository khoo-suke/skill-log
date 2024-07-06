'use client';

import React from 'react';
import { BaseEditor } from 'slate';
import styles from './index.module.scss';

interface ToolbarProps {
  editor: BaseEditor;
  CustomEditor: any; // CustomEditor 型を適切に定義してください
}


const Toolbar: React.FC<ToolbarProps> = ({ editor, CustomEditor }) => {
  return (
    <div className={styles.button}>
      {/* 太字 */}
      <button
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        B:太字
      </button>
      {/* イタリック */}
      <button
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleItalicMark(editor);
        }}
      >
        I:イタリック
      </button>
    </div>
  );
};

export default Toolbar;