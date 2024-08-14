'use client';

import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { Input } from '@/app/_components/Input';
import { Label } from '@/app/_components/Label';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Image from 'next/image';

interface SplitAreaProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  profileImageUrl: string | null;
  handleFabClick: () => void;
}

export const SplitArea: React.FC<SplitAreaProps> = ({
  name,
  setName,
  email,
  setEmail,
  profileImageUrl,
  handleFabClick
}) => {
  
  return (
      <div className={styles.SplitArea}>
        <div className={styles.InputArea}>
          <div className={styles.Label}>
            <Label value='ユーザー名'/>
            <Input
              name={'name'}
              id={'name'}
              type={'text'}
              value={name ?? ""}
              onChange={setName}
              />
          </div>
          <div className={styles.Label}>
            <Label value='メールアドレス（ユーザーID）'/>
            <Input
              name={'email'}
              id={'email'}
              type={'email'}
              value={email}
              onChange={setEmail}
              />
            {/* <p>
              ※メールアドレス（ユーザーID）の変更はこのページから変更できません。変更したい場合は、<Link href="">こちら</Link>から実施してください。
            </p> */}
          </div>
        </div>
        <div className={styles.ImageArea}>
          <Box className={styles.imageBox}>
            <Fab
              aria-label="add"
              onClick={handleFabClick}
            >
              <AddIcon />
            </Fab>
          </Box>
          <div className={styles.profileImage}>
            {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  className={styles.profileIcon}
                  alt="プロフィール画像"
                  width={240}
                  height={240}
                />
            ) : (
                <div className={styles.cameraIcon} >
                  <CameraAltIcon />
                </div>
              )}
          </div>
        </div>
    </div>
  );
};