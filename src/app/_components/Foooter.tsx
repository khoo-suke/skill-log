'use client';

import style from '@/app/_styles/Footer.module.scss';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { supabase } from '@/utils/supabase';

const Footer: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  };

  const { session, isLoding } = useSupabaseSession();

  return (
    <>
      {!isLoding && (
        <footer className={style.footer}>
          <div className={style.footerInner}>
              {session ? (
                <>
                <div className={style.flexBox}>
                  <Link href="/">
                    <Image src="/images/footer_logo.png" alt="skill-log" width={527} height={109}/>
                  </Link>
                  <nav>
                    <ul>
                      <li><Link href='/mypage'>HOME</Link></li>
                      <li><Link href='/mypage'>アカウント設定</Link></li>
                        <li><Link href='/' onClick={handleLogout}>ログアウト</Link></li>
                    </ul>
                  </nav>
              </div>
              <div className={style.copyLight}>
                <small>copylight</small>
              </div>
              </>
          ) : (
                <>
                <div className={style.flexBox}>
                  <Link href="/">
                    <Image src="/images/footer_logo.png" alt="skill-log" width={527} height={109}/>
                  </Link>
                  <nav>
                    <ul>
                      <li><Link href='/'>HOME</Link></li>
                      <li><Link href='/login'>ログイン</Link></li>
                      <li><Link href='/'>Q&A</Link></li>
                      <li><Link href='/'>製作者情報</Link></li>
                      <li><Link href='/contact'>お問い合わせ</Link></li>
                      <li><Link href='/'>利用規約</Link></li>
                      <li><Link href='/'>プライバシーポリシー</Link></li>
                    </ul>
                  </nav>
                </div>
                <div className={style.copyLight}>
                  <small>copylight</small>
                </div>
                </>
              )}
          </div>
        </footer>
      )}
    </>
  )
}

export default Footer;