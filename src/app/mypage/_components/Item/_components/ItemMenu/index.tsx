'use-client';

import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

// 親からステートを受け取る
interface ItemMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  handleDelete: () => void;
};

export const ItemMenu: React.FC<ItemMenuProps> = ({ anchorEl, open, handleClick, handleClose, handleDelete }) => {

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
        <MenuItem onClick={handleClose}>編集</MenuItem>
        <MenuItem onClick={handleDelete}>削除</MenuItem>
      </Menu>
    </div>
  );
};
