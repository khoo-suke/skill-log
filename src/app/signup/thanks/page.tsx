'use client';
import styles from '../_styles/Signup.module.scss';
import Link from 'next/link';
import { Wrapper } from '@/app/_components/Wrapper';

export default function Page() {
  return (
    <section className={styles.thanks}>
      <Wrapper size={700}>
        <div className={styles.cap}>
          <h2>ユーザー登録完了</h2>
        </div>
        <div className={styles.text}>
          <p>
            ユーザー登録ありがとうございます。<br />
            ご登録いただいたメールアドレスに、ユーザー登録完了メールを送信しました。
          </p>
        </div>
        <Link href='/login'>ログインページへ</Link>
      </Wrapper>
    </section>
  );
};
