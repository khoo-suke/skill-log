'use client';

import React,{ useState } from 'react';
import styles from '@/app/mypage/_components/Item/index.module.scss';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { RenderLeaf } from '@/app/mypage/_components/RenderLeaf';
import { withHistory } from 'slate-history';

// 親からステートを受け取る
interface SlateEditorProps {
  post: {
    content: string;
  }
};

export const SlateEditor = ({ post }: SlateEditorProps) => {

  const [editor] = useState(() => withHistory(withReact(createEditor())));

  return (
    <Slate
      editor={editor}
      initialValue={JSON.parse(post.content || '[]')}
      key={JSON.stringify(post.content)}
      onChange={() => { }}
    >
      <Editable
        readOnly
        className={styles.readOnly}
        renderLeaf={RenderLeaf}
      />
    </Slate>
  );
};