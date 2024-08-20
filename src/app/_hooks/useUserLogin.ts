"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

export const useUserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // ユーザーログイン
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`ログイン失敗: ${error.message}`);
    } else {
      router.replace("/mypage");
    }
  };

  // テストユーザー用のログイン
  const loginTestUser = async () => {
    const testUserEmail = "skill.log.customer@gmail.com";
    const testUserPassword = "testtesttest";

    const { error } = await supabase.auth.signInWithPassword({
      email: testUserEmail,
      password: testUserPassword,
    });

    if (error) {
      alert(`テストユーザーのログイン失敗: ${error.message}`);
    } else {
      router.replace("/mypage");
    }
  };

  return {
    setEmail,
    setPassword,
    handleSubmit,
    loginTestUser,
  };
};
