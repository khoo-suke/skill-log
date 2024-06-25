'use client';

import styles from './_styles/faq.module.scss';
import Wrapper from '../_components/Wrapper';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className={styles.FaqArea}>
          <div className={styles.FaqQuestion}>
            <p className={styles.QuestionText}>
              <span>Q</span>テキストテキストテキストテキストテキスト
            </p>
              <div className={styles.AccordionBtn}></div>
          </div>
          <div className={styles.FaqAnswer}>
            <span>A</span>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </div>
        </div>
        <div className={styles.FaqArea}>
          <div className={styles.FaqQuestion}>
            <p className={styles.QuestionText}>
              <span>Q</span>テキストテキストテキストテキストテキスト
            </p>
              <div className={styles.AccordionBtn}></div>
          </div>
          <div className={styles.FaqAnswer}>
            <span>A</span>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </div>
        </div>
        <div className={styles.FaqArea}>
          <div className={styles.FaqQuestion}>
            <p className={styles.QuestionText}>
              <span>Q</span>テキストテキストテキストテキストテキスト
            </p>
              <div className={styles.AccordionBtn}></div>
          </div>
          <div className={styles.FaqAnswer}>
            <span>A</span>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </div>
        </div>
        <div className={styles.FaqArea}>
          <div className={styles.FaqQuestion}>
            <p className={styles.QuestionText}>
              <span>Q</span>テキストテキストテキストテキストテキスト
            </p>
              <div className={styles.AccordionBtn}></div>
          </div>
          <div className={styles.FaqAnswer}>
            <span>A</span>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </div>
        </div>
      </div>
    </Wrapper>
    </>
  );
}