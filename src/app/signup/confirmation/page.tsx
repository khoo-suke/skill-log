'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import '../_styles/Signup.scss';

const Confirmation: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const content = searchParams.get('content') || '';

  const handleSend = async () => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, content })
      });

      if (!response.ok) {
        throw new Error('送信失敗');
      }
      router.push('/contact/thanks');
    } catch (error) {
      console.error(error);
      alert('送信失敗');
    }
  };

  return (
    <section className="confirmation wrapper--600 mb-[100px]">
      <div className="Cap">
        <h2 className="mb-5">お問い合わせ確認</h2>
      </div>
      <div className='mb-5'>
        <p>お名前</p>
        <p>{name}</p>
      </div>
      <div className='mb-5'>
        <p>メールアドレス</p>
        <p>{email}</p>
      </div>
      <div className='mb-[60px]'>
        <p>お問い合わせ内容</p>
        <p>{content}</p>
      </div>
      <div className="btnArea">
        <button onClick={handleSend}>送信</button>
      </div>
    </section>
  );
};

export default Confirmation;