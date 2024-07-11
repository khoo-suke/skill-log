'use client';

import styles from '@/app/_components/Footer/index.module.scss';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { supabase } from '@/utils/supabase';

export const Footer: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const { session, isLoading } = useSupabaseSession();

  return (
    <>
      {!isLoading && (
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            {session ? (
              <>
                <div className={styles.flexBox}>
                  <Link href="/">
                    <Image src="/images/footer_logo.png" alt="skill-log" width={527} height={109} />
                  </Link>
                  <nav>
                    <ul>
                      <li><Link href='/mypage'>HOME</Link></li>
                      <li><Link href='/mypage/account'>アカウント設定</Link></li>
                      <li><Link href='/' onClick={handleLogout}>ログアウト</Link></li>
                    </ul>
                  </nav>
                </div>
                <div className={styles.copyLight}>
                  <small>copylight</small>
                </div>
              </>
            ) : (
              <>
                <div className={styles.flexBox}>
                  <Link href="/">
                    <Image src="/images/footer_logo.png" alt="skill-log" width={527} height={109} />
                  </Link>
                  <nav>
                    <ul>
                      <li><Link href='/'>HOME</Link></li>
                      <li><Link href='/login'>ログイン</Link></li>
                      <li><Link href='/faq'>Q&A</Link></li>
                      <li><Link href='/contact'>お問い合わせ</Link></li>
                      <li><Link href='/terms'>利用規約</Link></li>
                      <li><Link href='/privacy'>プライバシーポリシー</Link></li>
                    </ul>
                  </nav>
                </div>
                <div className={styles.copyLight}>
                  <small>copylight</small>
                </div>
              </>
            )}
          </div>
        </footer>
      )}
    </>
  );
};