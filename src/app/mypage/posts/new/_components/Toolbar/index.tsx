'use client';

import React from 'react';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faItalic, faCode, faLink } from '@fortawesome/free-solid-svg-icons';
import FormatBoldIcon from '@mui/icons-material/FormatBold';


// CustomEditorの型定義
interface CustomEditorType {
  toggleBoldMark: (editor: BaseEditor & ReactEditor & HistoryEditor) => void;
  toggleItalicMark: (editor: BaseEditor & ReactEditor & HistoryEditor) => void;
  toggleCodeMark: (editor: BaseEditor & ReactEditor & HistoryEditor) => void;
  toggleLinkMark: (editor: BaseEditor & ReactEditor & HistoryEditor) => void;
};

interface ToolbarProps {
  editor: BaseEditor & ReactEditor & HistoryEditor;
  CustomEditor: CustomEditorType;
};

export const Toolbar: React.FC<ToolbarProps> = ({ editor, CustomEditor }) => {

  return (
    <div
      className={styles.button}
    >
      {/* 太字 */}
      <button
        type="button"
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        <FormatBoldIcon sx={{ fontSize: 27 }}/>
      </button>
    {/* イタリック */}
    <button
      type="button"
      onMouseDown={event => {
        event.preventDefault();
        CustomEditor.toggleItalicMark(editor);
        }}
    >
      <FontAwesomeIcon icon={faItalic} />
    </button>
    {/* コード */}
    <button
      type="button"
      onMouseDown={event => {
        event.preventDefault();
        CustomEditor.toggleCodeMark(editor);
        }}
      >
        <FontAwesomeIcon icon={faCode} />
      </button>
    {/* リンク */}
      <button
        type="button"
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleLinkMark(editor);
          }}
      >
      <FontAwesomeIcon icon={faLink} />
      </button>
    </div>
  );
};