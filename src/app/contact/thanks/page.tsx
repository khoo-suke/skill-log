'use client';

import styles from '@/app/contact/thanks/_styles/ContactThanks.module.scss';
import Link from 'next/link';
import { Wrapper } from '@/app/_components/Wrapper';

export default function Page() {
  return (
    <section className={styles.thanks}>
      <Wrapper size={600}>
        <h2>お問い合わせ完了</h2>
        <div>{/*mb-5 */}
          <p>
            お問い合わせありがとうございます。<br />5営業日以内にご返信いたしますので、しばらくお待ちください。
          </p>
        </div>
        <Link href='/'>トップページへ戻る</Link>
      </Wrapper>
    </section>
  );
};
