'use client';

import '../../_styles/Footer.scss';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footerInner wrapper-1200'>
        <div className='flexBox'>
          <Link href="/">
            <Image src="/images/footer_logo.png" alt="skill-log" width={527} height={109}/>
          </Link>
          <nav>
            <ul>
              <li><Link href='/'>HOME</Link></li>
              <li><Link href='/'>ログイン</Link></li>
              <li><Link href='/'>Q&A</Link></li>
              <li><Link href='/'>製作者情報</Link></li>
              <li><Link href='/contact'>お問い合わせ</Link></li>
              <li><Link href='/'>利用規約</Link></li>
              <li><Link href='/'>プライバシーポリシー</Link></li>
            </ul>
          </nav>
        </div>
        <div className='copyLight'>
          <small>copylight</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer;