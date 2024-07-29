'use client';

import React,{ useState, useEffect } from 'react';
import styles from '@/app/mypage/_components/Item/index.module.scss';
import { PostRequestBody } from '@/app/mypage/_types/PostRequestBody';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { RenderLeaf } from '@/app/mypage/_components/RenderLeaf';
import { withHistory } from 'slate-history';

// 親からステートを受け取る
interface SlateEditorProps {
  posts: PostRequestBody[],
  postId: number,
};

export const SlateEditor = ({ posts, postId }: SlateEditorProps) => {

  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const currentPost = posts.find(post => post.id === postId);

  if (!currentPost) {
    return;
  }

  console.log(currentPost.content);

  return (
    <>
      <Slate
        editor={editor}
        initialValue={JSON.parse(currentPost.content || '[]')}
        key={JSON.stringify(currentPost.content)}
        onChange={() => { }}
      >
        <Editable
          readOnly
          className={styles.readOnly}
          renderLeaf={RenderLeaf}
        />
      </Slate>
    </>
  );
};