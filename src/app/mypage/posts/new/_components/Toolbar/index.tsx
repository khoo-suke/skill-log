'use client';

import React from 'react';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faItalic, faCode } from '@fortawesome/free-solid-svg-icons';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { CustomPopover } from '@/app/_components/CustomPopover';

// CustomEditorの型定義
interface CustomEditorType {
  toggleBoldMark: (editor: BaseEditor & ReactEditor & HistoryEditor) => void;
  toggleItalicMark: (editor: BaseEditor & ReactEditor & HistoryEditor) => void;
  toggleCodeMark: (editor: BaseEditor & ReactEditor & HistoryEditor) => void;
};

interface ToolbarProps {
  editor: BaseEditor & ReactEditor & HistoryEditor;
  CustomEditor: CustomEditorType;
};

export const Toolbar: React.FC<ToolbarProps> = ({ editor, CustomEditor }) => {
  const [title, setTitle] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [popoverText, setPopoverText] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTitle(event.target.value as string);
  };

  // ポップアップオーバー
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>, text: string) => {
    setAnchorEl(event.currentTarget);
    setPopoverText(text);
  };

  const handlePopoverClose = () => {
    // マウスがポップオーバー内にあるかどうかを確認
    setTimeout(() => {
      if (anchorEl && !anchorEl.contains(document.activeElement)) {
        setAnchorEl(null);
      }
    }, 100); // 100msのディレイを追加
  };

  const open = Boolean(anchorEl);

  return (
    <div
      className={styles.button}
      onMouseLeave={handlePopoverClose}
    >
    {/* 見出し */}
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">見出し</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={title}
          label="title"
          onChange={handleChange}
        >
          <MenuItem value={10}>段落</MenuItem>
          <MenuItem value={20}>見出し1</MenuItem>
          <MenuItem value={30}>見出し2</MenuItem>
          <MenuItem value={40}>見出し3</MenuItem>
          <MenuItem value={50}>見出し4</MenuItem>
          <MenuItem value={60}>見出し5</MenuItem>
        </Select>
      </FormControl>
    </Box>
      {/* 太字 */}
      <button
        type="button"
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
        onMouseEnter={e => handleMouseEnter(e, '太字 (ctrl + B)')}
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
        onMouseEnter={e => handleMouseEnter(e, 'イタリック (ctrl + I)')}
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
        onMouseEnter={e => handleMouseEnter(e, 'コード (ctrl + shift + C)')}
    >
      <FontAwesomeIcon icon={faCode} />
      </button>
      <CustomPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        text={popoverText}
      />
    </div>
  );
};