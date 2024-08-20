"use client";
import styles from "./_styles/SignupThanks.module.scss";
import { Wrapper } from "@/app/_components/Wrapper";
import Image from "next/image";

export default function Page() {
  return (
    <section className={styles.thanks}>
      <Wrapper size={600}>
        <div className={styles.cap}>
          <h2>メールを送信しました</h2>
        </div>
        <Image
          src="/images/thanks_mail.png"
          alt="ユーザー認証メール送信"
          width={313}
          height={218}
        />
        <div className={styles.text}>
          <p>
            登録いただいたメールアドレスに、認証メールを送信しました。
            <br />
            メールのURLリンクをクリックして、メール認証を完了させてください。
          </p>
        </div>
      </Wrapper>
    </section>
  );
}
