"use client";

import styles from "@/app/login/_styles/Login.module.scss";
import Link from "next/link";
import { Button } from "../_components/Button";
import { Wrapper } from "../_components/Wrapper";
import { Label } from "../_components/Label";
import { useUserLogin } from "../_hooks/useUserLogin";

export default function Page() {
  // ログインフォームのデータを管理
  const { handleSubmit, isSubmitting, errors, register } = useUserLogin();

  return (
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
            <Label value="ID(メールアドレス)" htmlfor="email" />
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}

            <Label value="パスワード" htmlfor="password" />
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={styles.btnArea}>
            <Button
              isLink={false}
              type="submit"
              color={"pink"}
              size={"large"}
              disabled={isSubmitting}
            >
              ログイン
            </Button>
          </div>
        </form>
      </Wrapper>

      <Wrapper size={600}>
        <div className={styles.textArea}>
          <p>
            ※アカウントをお持ちでない方は
            <Link href="/signup">こちら</Link>
            こちらからユーザー登録をしてください。
          </p>
          <p>
            ※なお、動作確認は
            <Link href="/">テストページ</Link>
            からご覧いただけます。
          </p>
        </div>
      </Wrapper>
    </div>
  );
}
