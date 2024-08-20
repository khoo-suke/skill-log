"use client";

import styles from "@/app/resetpassword/sendmail/_styles/resetPassword.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/_components/Button";
import { Wrapper } from "@/app/_components/Wrapper";
import { Input } from "@/app/_components/Input";
import { Label } from "@/app/_components/Label";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/resetpassword/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`パスワード再設定失敗`);
      }

      alert("確認メール送信");
      router.push("/resetpassword/thanks");
    } catch (error) {
      console.error(error);
      console.error("パスワード再設定メールの送信エラー:", error);
      alert("パスワード再設定メール失敗");
    }
  };

  return (
    <>
      <div className={styles.reset}>
        <Wrapper size={600}>
          <div className={styles.cap}>
            <span>RESET PASSWORD</span>
            <h2>パスワード再設定</h2>
          </div>
        </Wrapper>
        <Wrapper size={700}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.resetInner}>
              <Label
                value="登録されているメールアドレスを入力してください"
                htmlfor="emal"
              />
              <Input
                type={"email"}
                name={"email"}
                id={"email"}
                placeholder={"name@company.com"}
                required
                value={email}
                onChange={(value) => setEmail(value)}
              />
            </div>
            <div className={styles.btnArea}>
              <Button
                isLink={false}
                type="submit"
                color={"pink"}
                size={"middle"}
              >
                送信
              </Button>
            </div>
          </form>
        </Wrapper>
        <Wrapper size={600}>
          <div className={styles.textArea}>
            <p>
              ※アカウントをお持ちでない方は<Link href="/">こちら</Link>
              こちらから新規ユーザー登録をしてください。
            </p>
            <p>
              ※なお、動作確認は<Link href="/">テストページ</Link>
              からご覧いただけます。
            </p>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
