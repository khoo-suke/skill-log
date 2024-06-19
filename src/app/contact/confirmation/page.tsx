'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/app/contact/_styles/Contact.module.scss';

const Confirmation: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const content = searchParams.get('content') || '';

  // リダイレクト処理
  useEffect(() => {
    if (!name || !email || !content) {
      router.push('/contact');
    }
  }, [name, email, content, router]);

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
    <section className={styles.confirmation}> {/* wrapper--600 */}
      <div className={styles.cap}> 
        <h2>お問い合わせ確認</h2>
      </div>
      <div className={styles.nameArea}>
        <p>お名前</p>
        <p>{name}</p>
      </div>
      <div className={styles.mailArea}>
        <p>メールアドレス</p>
        <p>{email}</p>
      </div>
      <div className={styles.textArea}>
        <p>お問い合わせ内容</p>
        <p>{content}</p>
      </div>
      <div className={styles.btnArea}>
        <button onClick={handleSend}>送信</button>
      </div>
    </section>
  );
};

export default Confirmation;