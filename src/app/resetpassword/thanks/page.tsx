"use client";

import styles from "@/app/resetpassword/thanks/_styles/resetThanks.module.scss";
import { Wrapper } from "@/app/_components/Wrapper";

export default function Page() {
  return (
    <section className={styles.thanks}>
      <Wrapper size={700}>
        <div className={styles.cap}>
          <h2>パスワード再設定メール送信</h2>
        </div>
        <div className={styles.text}>
          <p>
            パスワード再設定用のリンクをメールアドレスに送信しました。
            <br />
            メール内のリンクをクリックし、パスワード再設定画面に進んでください。
          </p>
        </div>
      </Wrapper>
    </section>
  );
}
