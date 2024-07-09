'use client';

import styles from './_styles/faq.module.scss';
import { Wrapper } from '../_components/Wrapper';
import Image from 'next/image';
import Link from 'next/link';
import { FaqArea } from './_components/FaqArea';

export default function Page() {

  return (
    <>
    <Wrapper size={800}>
      <div className={styles.capArea}>
        <div className={styles.cap}>
          <span>FAQ</span>
          <h2>よくある質問</h2>
          <p>以下のQ&Aをご確認ください。<br/>それでもご不明な点がございましたら、<Link href="/contact">お問い合せページ</Link>からお問い合せください。</p>
        </div>
        <Image src="/images/faq_img01.png" alt="よくある質問" width={257} height={269} />
      </div>
    </Wrapper>
      <Wrapper size={700}>
        <div className={styles.Faq}>
          <FaqArea
            boolean={true}
            question='質問1'
            answer='答え1'
          />
          <FaqArea
            boolean={false}
            question='質問2'
            answer='答え2'
          />
          <FaqArea
            boolean={false}
            question='質問3'
            answer='答え3'
          />
          <FaqArea
            boolean={false}
            question='質問3'
            answer='答え3'
          />
        </div>
    </Wrapper>
    </>
  );
}