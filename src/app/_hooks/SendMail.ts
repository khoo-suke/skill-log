import nodemailer from 'nodemailer';


export const SendMail = async (name: string, email: string, content: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // 管理人側
  const toHostMailData = {
    from: `${email}`,
    to: process.env.GMAIL_USER,
    subject: `[お問い合わせ]${name}様`,
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
  });

  // ユーザー側
  const toUserMailData = {
    from: process.env.GMAIL_USER,
    to: `${email}`,
    subject: `【Skill-Log】お問い合わせ受け付けました`,
    html: `
    <p>${name}様</p>
    <p>お問い合わせありがとうございます。</p>
    <p>5営業日以内にご連絡いたしますので、しばらくお待ちください。</p>
  `,
  };
  transporter.sendMail(toUserMailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};