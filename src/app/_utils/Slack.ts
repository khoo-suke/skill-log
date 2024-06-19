import { IncomingWebhook } from '@slack/webhook';

// スラックに通知を送信
const url = process.env.SLACK_WEBHOOK_URL;
if (!url) {
  throw new Error('Slackのwebhook URLのエラー');
}

const webhook = new IncomingWebhook(url);

export async function Slack (name: string, email: string, content: string) {
  const payload = {
    text: `新規お問い合わせ\n名前: ${name}\nメールアドレス: ${email}\n内容: ${content}`,
  };

  try {
    await webhook.send(payload);
  } catch (error) {
    console.error('Slack通知エラー:', error);
    throw error;
  }
};