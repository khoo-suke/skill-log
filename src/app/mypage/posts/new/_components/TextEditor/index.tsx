"use client";

import React, { useState, useCallback, Dispatch, SetStateAction } from "react";
import { createEditor, BaseEditor, Editor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor, withHistory } from "slate-history";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import Leaf from "../Leaf";
import { Toolbar } from "../Toolbar";
import styles from "@/app/mypage/posts/new/_components/TextEditor/index.module.scss";
import { CustomText } from "../../_types/CustomText";
import { CustomElement } from "../../_types/CustomElement";

// カスタムエディター関数
const CustomEditor = {
  // 太字
  isBoldMarkActive(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  toggleBoldMark(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  //  イタリック
  isItalicMarkActive(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  toggleItalicMark(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },

  // コードスタイルのチェック
  isCodeMarkActive(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.code === true : false;
  },

  toggleCodeMark(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const isActive = CustomEditor.isCodeMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "code");
    } else {
      Editor.addMark(editor, "code", true);
    }
  },

  // リンクスタイルのチェック
  isLinkMarkActive(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.link === true : false;
  },

  toggleLinkMark(editor: BaseEditor & ReactEditor & HistoryEditor) {
    const isActive = CustomEditor.isLinkMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "link");
    } else {
      Editor.addMark(editor, "link", true);
    }
  },
};

// Slate.js でのカスタムタイプの定義
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// 型を定義
interface ContentProps {
  content: CustomElement[];
  setContent: Dispatch<SetStateAction<CustomElement[]>>;
}

export const TextEditor = ({ content, setContent }: ContentProps) => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!event.ctrlKey) {
        return;
      }

      switch (event.key) {
        // ctrl + b で太字
        case "b": {
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
          return;
        }
        // ctrl + i でイタリック
        case "i": {
          event.preventDefault();
          CustomEditor.toggleItalicMark(editor);
          return;
        }
        // ctrl + shift + c でコード
        case "c": {
          if (event.shiftKey) {
            event.preventDefault();
            CustomEditor.toggleCodeMark(editor);
            return;
          }
          return;
        }
        // ctrl + l でリンク
        case "l": {
          event.preventDefault();
          CustomEditor.toggleLinkMark(editor);
          return;
        }
      }
    },
    [editor]
  );

  // コンテンツが変更された際に呼び出される関数
  const handleContentChange = useCallback(
    (newValue: Descendant[]) => {
      setContent(newValue as CustomElement[]); // Descendantが初期値のため型を変換
    },
    [setContent]
  );

  return (
    <div className={styles.editorArea}>
      <div className={styles.inner}>
        <Slate
          editor={editor}
          initialValue={content}
          onChange={handleContentChange}
        >
          <Toolbar editor={editor} CustomEditor={CustomEditor} />
          <div className={styles.text}>
            <Editable
              renderLeaf={renderLeaf}
              onKeyDown={handleKeyDown}
              className={styles.editable}
            />
          </div>
        </Slate>
      </div>
    </div>
  );
};
