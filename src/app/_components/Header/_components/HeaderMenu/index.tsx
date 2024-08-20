"use-client";

import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { useProfile } from "@/app/_hooks/useProfile";

export const HeaderMenu = () => {
  // プロフィール画像URL取得
  const { profileImageUrl, fetchProfileData } = useProfile();

  // メニューのステート
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  // メニューを開く
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // メニューを閉じる
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ログアウト
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // プロフィール画像を取得
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          border: "1px solid #bbb",
          ml: 2,
        }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          src={profileImageUrl || undefined}
          sx={{
            padding: 0,
            height: 40,
            width: 40,
          }}
        ></Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        elevation={0}
        sx={{
          overflow: "visible",
          filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.32))",
          marginTop: "1rem",
          "& .MuiAvatar-root": {
            width: 30,
            height: 30,
            marginLeft: "-0.5rem",
            marginRight: "1rem",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href="/mypage/account" passHref>
          <MenuItem>
            <Avatar
              src={profileImageUrl || undefined}
              sx={{
                padding: 0,
                height: 40,
                width: 40,
              }}
            />{" "}
            アカウント設定
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
};
