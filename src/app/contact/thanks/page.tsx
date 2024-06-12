'use client';
import '../_styles/Contact.scss';
import Link from 'next/link';

export default function Page() {
  return (
    <section className="thanks wrapper--600">
      <div className="Cap">
        <h2 className="mb-5">お問い合わせ完了</h2>
      </div>
      <div className='mb-5'>
        <p>
          お問い合わせありがとうございます。<br />5営業日以内にご返信いたしますので、しばらくお待ちください。
        </p>
      </div>
      <Link href='/'>>>トップページへ戻る</Link>
    </section>
  );
};
