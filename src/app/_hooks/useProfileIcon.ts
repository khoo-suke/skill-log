"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { useProfile } from "./useProfile";

export const useProfileIcon = () => {
  // プロフィール画像のkeyを取得
  const { profileImageKey, setProfileImageKey } = useProfile();

  // Imageタグのsrcにセットする画像URLを持たせるstate
  const [profileImageUrl, setProfileImageUrl] = useState<null | string>(null);

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
    profileImageUrl,
    profileImageKey,
    setProfileImageKey,
    handleFabClick,
    handleImageChange,
  };
};
