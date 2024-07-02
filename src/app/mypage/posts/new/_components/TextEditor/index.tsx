'use client';

import React, { useState, useCallback } from 'react';
import { createEditor, Descendant, BaseEditor, Editor, Element } from 'slate';
import { Slate, Editable, withReact, RenderLeafProps } from 'slate-react';
import Leaf from '../Leaf';
import Toolbar from '../Toolbar';
import Wrapper from '@/app/_components/Wrapper';
import styles from '@/app/mypage/posts/new/_styles/PostNew.module.scss';
import { CustomText } from '../../_types/CustomText';

// カスタムエレメント型の定義
interface CustomElement extends Element {
  type: 'paragraph';
  children: CustomText[];
}

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: '初期設定のテキストテキスト' }],
  },
];

// カスタムエディター関数
const CustomEditor = {
  // 太字
  isBoldMarkActive(editor: BaseEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  toggleBoldMark(editor: BaseEditor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  },

  //  イタリック
  isItalicMarkActive(editor: BaseEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  toggleItalicMark(editor: BaseEditor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'italic');
    } else {
      Editor.addMark(editor, 'italic', true);
    }
  },
};

// Slate.js でのカスタムタイプの定義
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor;
    Text: CustomText;
  }
}

const TextEditor: React.FC = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      // ctrl + b で太字
      case 'b': {
        event.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
      }
      // ctrl + i でイタリック
      case 'i': {
        event.preventDefault();
        CustomEditor.toggleItalicMark(editor);
        break;
      }
      // ctrl + z でスタイルのキャンセル（デフォルト）
      case 'z': {
        event.preventDefault();
        break;
      }
    }
  }, [editor]);

  return (
    <Wrapper size={800}>
      <div className={styles.editorArea}>
        <div className={styles.inner}>
          <Slate editor={editor} initialValue={initialValue}>
            <Toolbar editor={editor} CustomEditor={CustomEditor} />
            <div className={styles.text}>
              <Editable
                renderLeaf={renderLeaf}
                onKeyDown={handleKeyDown}
              />
            </div>
          </Slate>
        </div>
      </div>
    </Wrapper>
  );
};

export default TextEditor;
