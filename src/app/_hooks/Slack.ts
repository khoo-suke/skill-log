import { IncomingWebhook } from '@slack/webhook';

export const Slack = async (name: string, email: string, content: string) => {
const url = process.env.SLACK_WEBHOOK_URL;
    if (!url) {
      throw new Error('Slackのwebhook URLのエラー');
  };
  
  const webhook = new IncomingWebhook(url);
  const payload = {
    text: `新規お問い合わせ\n名前: ${name}\nメールアドレス: ${email}\n内容: ${content}`,
  };
  await webhook.send(payload);
};