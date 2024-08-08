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
            question='このサービスはどのような機能がありますか？'
            answer='このサービスは、エンジニア向けの勉強時間とナレッジを管理するためのアプリです。主な機能には、勉強時間の記録、コードやナレッジのメモ機能、タスク管理や疑問点のタグ付け、さらに、習得したスキルや資格取得に向けたモチベーションの維持が含まれます。'
          />
          <FaqArea
            boolean={false}
            question='アカウントを作成するにはどうすれば良いですか？'
            answer='トップページの「新規登録」ボタンをクリックし、必要な情報（メールアドレス、パスワードなど）を入力するだけで登録が完了します。登録後、必ず届いたメールアドレスのURLをクリックして、ユーザー認証を済ませてください。その後ログインしてすぐにサービスの全機能をご利用いただけます。'
          />
          <FaqArea
            boolean={false}
            question='テストユーザーでのログインはどのように利用しますか？'
            answer='テストユーザーでのログインは、実際にサービスを試すための便利な機能です。トップページの「テストユーザーでログイン」ボタンをクリックすると、予め設定されたテストアカウントでログインできます。この機能を使用することで、登録やログインの手間を省き、サービスの機能をすぐに確認することができます。'
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