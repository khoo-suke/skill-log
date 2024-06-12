import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { IncomingWebhook } from '@slack/webhook';
import nodemailer from 'nodemailer';

//POST
const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {

    // データベースに保存
    const body = await request.json()
    const { name, email, content } = body
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        content,
      }
    });

    // スラックに通知を送信
    const url = process.env.SLACK_WEBHOOK_URL;
    if (!url) {
      throw new Error('Slackのwebhook URLのエラー');
    }
    const webhook = new IncomingWebhook(url);
    const payload = {
      text: `新規お問い合わせ\n名前: ${name}\nメールアドレス: ${email}\n内容: ${content}`,
    }
    await webhook.send(payload);

    //問い合わせ完了メール送信
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    //管理人側
    const toHostMailData = {
      from: `${email}`,
      to: process.env.GMAIL_USER,
      sugjest: `[お問い合わせ]${name}様`,
      text: `${content} Send from ${email}`,
      html: `
        <p>【名前】</p>
        <p>${name}</p>
        <p>【メールアドレス】</p>
        <p>${email}</p>
        <p>【内容】</p>
        <p>${content}</p>
        `,
    };
    transporter.sendMail(toHostMailData, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    })

    //ユーザー側
    const toUserMailData = {
      from: process.env.GMAIL_USER,
      to: `${email}`,
      sugjest: `【Skill-Log】お問い合わせ受け付けました`,
      html: `
        <p>${name}様</p>
        <p>お問い合わせありがとうございます。</p>
        <p>5営業日以内にご連絡いたしますので、しばらくお待ちください。</p>
        `,
    };
    transporter.sendMail(toUserMailData, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    })

    //成功
    return NextResponse.json({
      status: 'OK',
      message: 'お問い合わせ完了',
      id: contact.id,
    })

  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}