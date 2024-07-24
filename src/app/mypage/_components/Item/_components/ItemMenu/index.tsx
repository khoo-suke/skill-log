'use-client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import Link from 'next/link';
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

// 親からステートを受け取る
interface ItemMenuProps {
  fetchPosts: () => Promise<void>;
  postId: number;
}

export const ItemMenu: React.FC<ItemMenuProps> = ({ fetchPosts, postId }) => {
  const { token } = useSupabaseSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  console.log(postId);

  // メニューを開く
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  // メニューを閉じる
  const handleClose = () => {
    setAnchorEl(null);
  };

  // DELETE 記事を削除
  const handleDelete = async () => {
    if (!token || !postId) return;

    const confirmed = confirm(
      "削除した記事は復元できませんが、削除してよろしいですか。"
    );
    if (!confirmed) {
      // メニューを閉じる
      handleClose();
      return;
    }

    console.log("削除");

    try {
      const response = await fetch(`api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        console.error("記事削除失敗");
      }

      // ステートの更新
      fetchPosts();
      // メニューを閉じる
      handleClose();
    } catch (error) {
      console.error("記事削除中に失敗", error);
    }
  };

  return (
    <div className={styles.editButton}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color: '#333',
          fontSize: '100%',
          padding: '0',
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </Button>
      <Menu
        id={styles.basicMenu}
        className={styles.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          color: '#333',
          fontSize: '100%',
          padding: '0',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href={`/mypage/posts/edit/${postId}`}>
            編集
          </Link>
        </MenuItem>
        <MenuItem onClick={handleDelete}>削除</MenuItem>
      </Menu>
    </div>
  );
};

