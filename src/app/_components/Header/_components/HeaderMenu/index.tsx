'use-client';

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Link from 'next/link';

// 親からステートを受け取る
interface HeaderMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  handleLogout: () => void;
};

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ anchorEl, open, handleClick, handleClose, handleLogout }) => {

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{
          width: 40,
          height: 40,
          padding: 0,
        }}>
          K
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        elevation= {0}
        sx={{
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.32))',
          marginTop: '1rem',
          '& .MuiAvatar-root': {
            width: 30,
            height: 30,
            marginLeft: '-0.5rem',
            marginRight: '1rem',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href="/mypage/account" passHref>
          <MenuItem>
          <Avatar /> アカウント設定
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          ログアウト
        </MenuItem>
      </Menu>
    </>
  );
}