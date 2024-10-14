"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginArgs } from "@/app/_types/LoginArgs";

// Zodスキーマの定義
const schema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .email({ message: "無効なメールアドレスです" }),
  password: z.string().min(1, { message: "パスワードは必須です" }),
});

export const useUserLogin = () => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    register,
  } = useForm<LoginArgs>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  // ユーザーログイン処理
  const handleLogin = async (data: LoginArgs) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("ログイン失敗: メールアドレスもしくはパスワードが正しくありません");
    } else {
      router.replace("/mypage");
    }
  };

  // テストユーザー用のログイン
  const loginTestUser = async () => {
    const testUserEmail = "skill.log.customer@gmail.com";
    const testUserPassword = "testtesttest";

    setValue("email", testUserEmail);
    setValue("password", testUserPassword);

    // テストユーザーでログイン
    await handleLogin({ email: testUserEmail, password: testUserPassword });
  };

  return {
    handleSubmit: handleSubmit(handleLogin),
    isSubmitting,
    errors,
    register,
    loginTestUser,
  };
};
