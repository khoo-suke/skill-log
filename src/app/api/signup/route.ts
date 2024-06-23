import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { PrismaClient } from "@prisma/client";
import { supabase } from '@/utils/supabase';

const prisma = new PrismaClient();

//POST
export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    // Supabaseで新規ユーザー作成
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
      emailRedirectTo: `/login`,
      },
    });

    if (error) {
      alert('登録失敗');
      console.log('Supabase signUp error:', error);
    };

    // SupabaseのユーザーIDを取得
    const user = data.user;

    // PrismaのProfileテーブルにユーザー情報を保存
    const newProfile = await prisma.profile.create({
      data: {
        supabaseUserId,
        email,
      },
    });

    //ユーザー登録完了メール送信
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    //ユーザー側
    const toUserMailData = {
      from: process.env.GMAIL_USER,
      to: `${email}`,
      subject: `【Skill-Log】ユーザー登録完了`,
      html: `
        <p>ユーザー登録完了しました。</p>
        `,
    };

    await transporter.sendMail(toUserMailData);

    //成功
    return NextResponse.json({
      status: 'OK',
      message: 'ユーザー登録完了',
      profile: newProfile
    });

  } catch (error) {
    console.error('メール送信エラー:', error);
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  };
};