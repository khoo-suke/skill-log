import { NextRequest, NextResponse } from "next/server";
// import nodemailer from 'nodemailer';
import { PrismaClient } from "@prisma/client";
import { supabase } from "@/utils/supabase";

const prisma = new PrismaClient();

//POST
export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    // 環境変数からベースURLを取得
    const baseUrl = process.env.BASE_URL;

    // Supabaseで新規ユーザー作成
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${baseUrl}/login`,
      },
    });

    if (error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    } else if (!data.user) {
      return NextResponse.json(
        { status: "error", message: "ユーザー作成失敗" },
        { status: 400 }
      );
    }

    // SupabaseのユーザーIDを取得
    const userId = data.user.id;

    // PrismaのProfileテーブルにユーザー情報を保存
    const newProfile = await prisma.profile.create({
      data: {
        supabaseUserId: userId,
        email,
      },
    });

    // //ユーザー登録完了メール送信
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_PASSWORD,
    //   },
    // });

    // //ユーザー側
    // const toUserMailData = {
    //   from: process.env.GMAIL_USER,
    //   to: `${email}`,
    //   subject: `【Skill-Log】ユーザー登録完了`,
    //   html: `
    //     <p>ユーザー登録完了しました。</p>
    //     `,
    // };

    // await transporter.sendMail(toUserMailData);

    //成功
    return NextResponse.json({
      status: "OK",
      message: "ユーザー登録完了",
      profile: newProfile,
    });
  } catch (error) {
    console.error("メール送信エラー:", error);
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
