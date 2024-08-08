"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export const useProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [profileImageKey, setProfileImageKey] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<null | string>(null);
  const { token } = useSupabaseSession();
  const router = useRouter();

  // GET profile情報
  const fetchProfileData = async () => {
    if (!token) return;

    try {
      const response = await fetch(`/api/account`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("プロフィールが見つからない");
      }

      const user = await response.json();
      const profile = user.profile;

      // 各データを設定
      setName(profile.name || "");
      setEmail(profile.email || "");
      setGoal(profile.goal || "");

      const profileImageKey = profile.profileImageKey;
      if (profileImageKey) {
        const {
          data: { publicUrl },
        } = await supabase.storage
          .from("profile_img")
          .getPublicUrl(profileImageKey);

        setProfileImageUrl(publicUrl);
      }
    } catch (error) {
      console.error("プロフィール情報の取得中にエラー", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [token]);

  // プロフィール画像の取得
  useEffect(() => {
    if (!profileImageKey) return;

    const fetcher = async () => {
      try {
        const {
          data: { publicUrl },
        } = await supabase.storage
          .from("profile_img")
          .getPublicUrl(profileImageKey);

        setProfileImageUrl(publicUrl);
      } catch (error) {
        console.error("プロフィール画像URLの取得中にエラー", error);
      }
    };
    console.log("現在のプロフィール画像キー:", profileImageKey);
    fetcher();
  }, [profileImageKey]);

  // PUT profile情報
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    console.log("送信前のプロフィール画像キー:", profileImageKey);

    try {
      await fetch(`/api/account`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },

        body: JSON.stringify({
          name,
          goal,
          profileImageKey,
        }),
      });

      alert("更新完了");
      router.replace("/mypage/account");
    } catch (error) {
      console.error("プロフィール情報の更新中にエラー", error);
    }
  };

  // プロフィール画像設定
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target.files || e.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return;
    }

    const file = e.target.files[0]; // 選択された画像を取得
    const filePath = `private/${uuidv4()}`; // ファイルパスを指定

    // Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from("profile_img") // ここでバケット名を指定
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    // アップロードに失敗したらエラーを表示して終了
    if (error) {
      alert(error.message);
      return;
    }

    // data.pathに、画像固有のkeyが入っているので、thumbnailImageKeyに格納する
    console.log("アップロードされた画像のパス:", data.path);
    setProfileImageKey(data.path);
  };

  // ファブボタンを押したら、画像選択ダイアログを表示
  const handleFabClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) =>
      handleImageChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    input.click();
  };

  return {
    name,
    setName,
    email,
    setEmail,
    goal,
    setGoal,
    profileImageUrl,
    handleSubmit,
    handleFabClick,
    fetchProfileData,
  };
};
