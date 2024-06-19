import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Slack } from "@/app/_utils/Slack";
import { SendMail } from "@/app/_hooks/SendMail";

const prisma = new PrismaClient();

//POST
export const POST = async (request: NextRequest) => {
  try {
    // データベースに保存
    const body = await request.json();
    const { name, email, content } = body;
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        content,
      }
    });

    // スラックに通知を送信
    await Slack(name, email, content); 

    // 問い合わせ完了メール送信
    await SendMail(name, email, content); 

    // 成功
    return NextResponse.json({
      status: 'OK',
      message: 'お問い合わせ完了',
      id: contact.id,
    });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 400 });
    }
  };
};