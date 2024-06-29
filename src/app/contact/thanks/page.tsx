'use client';

import styles from '@/app/contact/_styles/Contact.module.scss';
import Link from 'next/link';

export default function Page() {
  return (
    <section className={styles.thanks}>{/* wrapper--600 card */}
      <h2>お問い合わせ完了</h2>
      <div>{/*mb-5 */}
        <p>
          お問い合わせありがとうございます。<br />5営業日以内にご返信いたしますので、しばらくお待ちください。
        </p>
      </div>
      <Link href='/'>トップページへ戻る</Link>
    </section>
  );
};
