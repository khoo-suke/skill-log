"use client";

import styles from "@/app/login/_styles/Login.module.scss";
import Link from "next/link";
import { Button } from "../_components/Button";
import { Wrapper } from "../_components/Wrapper";
import { Input } from "../_components/Input";
import { Label } from "../_components/Label";
import { useUserLogin } from "../_hooks/useUserLogin";

export default function Page() {
  // ログインフォームのデータを管理
  const { setEmail, setPassword, handleSubmit } = useUserLogin();

  return (
    <>
      <div className={styles.login}>
        <Wrapper size={600}>
          <div className={styles.cap}>
            <span>LOGIN</span>
            <h2>ログイン</h2>
          </div>
        </Wrapper>
        <Wrapper size={700}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.loginInner}>
              <Label value="ID(メールアドレス)" htmlfor="emal" />
              <Input
                type={"email"}
                name={"email"}
                id={"email"}
                placeholder={"name@company.com"}
                required
                onChange={setEmail}
              />
              <Label value="パスワード" htmlfor="password" />
              <Input
                type={"password"}
                name={"password"}
                id={"password"}
                placeholder={"••••••••"}
                required
                onChange={setPassword}
              />
            </div>
            <div className={styles.btnArea}>
              <Button
                isLink={false}
                type="submit"
                color={"pink"}
                size={"large"}
              >
                ログイン
              </Button>
            </div>
          </form>
        </Wrapper>
        <Wrapper size={600}>
          <div className={styles.textArea}>
            <p>
              ※パスワードお忘れの方は
              <Link href="/resetpassword/sendmail">こちら</Link>
              からパスワードを再設定してください。
            </p>
            <p>
              ※アカウントをお持ちでない方は<Link href="/signup">こちら</Link>
              こちらからユーザー登録をしてください。
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
