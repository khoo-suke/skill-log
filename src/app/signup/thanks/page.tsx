'use client';
import '../_styles/Signup.scss';
import Link from 'next/link';

export default function Page() {
  return (
    <section className="thanks wrapper--700 card">
      <div className="cap">
        <h2>ユーザー登録完了</h2>
      </div>
      <div className='text'>
        <p>
          ユーザー登録ありがとうございます。<br />
          ご登録いただいたメールアドレスに、ユーザー登録完了メールを送信しました。
        </p>
      </div>
      <Link href='/login'>ログインページへ</Link>
    </section>
  );
};
