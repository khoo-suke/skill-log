'use client';

import styles from '@/app/_components/Header/index.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import Button from '@/app/_components/Button';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const HeaderDefault: React.FC = () => {
  const { session, isLoading } = useSupabaseSession();

  return (
    <>
      {!isLoading && (
        session ? (
          <header className={styles.headerLogin}>
            <Link href="/mypage" className={styles.headerLogo}>
              <Image src="/images/header_logo_black.png" alt="skill-log" width={132} height={27}/>
            </Link>
            <div className={styles.btnArea}>
              <Button isLink={true} href={"/mypage/posts/new"} color={"pink"} size={"small"}>
              <FontAwesomeIcon icon={faCirclePlus} />
                新規投稿
              </Button>
              <Link href="mypage/account" className={styles.account}></Link>
            </div>
          </header>
        ) : (
          <header className={styles.header}>
            <Link href="/" className={styles.headerLogo}>
              <Image src="/images/header_logo_white.png" alt="skill-log" width={132} height={27}/>
            </Link>
            <div className={styles.btnArea}>
              <Button isLink={true} href={"/login"} color={"black"} size={"small"}>
                ログイン
              </Button>
              <Button isLink={true} href={"/signup"} color={"white"} size={"small"}>
                新規登録
              </Button>
           </div>
          </header>
        )
      )}
    </>
  );
}

const HeaderThanks: React.FC = () => (
  <header className={styles.header}>
    <Link href="/mypage" className={styles.headerLogo}>
      <Image src="/images/header_logo.png" alt="skill-log" width={132} height={27}/>
    </Link>
  </header>
);

const Header: React.FC = () => {
  const currentUrl = usePathname();

  console.log(currentUrl);

  if (currentUrl === '/signup/thanks') {
    return <HeaderThanks />;
  }

  return <HeaderDefault />;
};

export default Header;