import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

//POST
export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();

    // 環境変数からベースURLを取得
    const baseUrl = process.env.BASE_URL;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/resetpassword/reset`,
    });

    if (error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }

    return NextResponse.json({
      status: "OK",
      message: "リセットパスワードメール送信完了",
    });
  } catch (error) {
    console.log("リセットパスワードメール送信失敗");
    return NextResponse.json(
      { status: "パスワード再設定に失敗しました" },
      { status: 500 }
    );
  }
};
