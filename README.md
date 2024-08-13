# 開発者向け
## パッケージインストール
```bash
npm install
```

## 環境変数設定
`.env` をルートディレクトリに作成し、それぞれの中身はリクエストしてください。

## ローカルサーバー起動
```bash
npm dev run
```

# 利用者向け
![image](https://github.com/user-attachments/assets/64139140-f716-4b8c-8d9b-6763c98f50bf)

## サービスの URL
https://skill-log.vercel.app/<br/>
ワンクリックでゲストユーザーとしてログインできるので、お気軽にお試しください。

## サービス開発の経緯
フロントエンドエンジニアとして転職を目指し、オリジナルアプリの制作を行いました。<br/>
サービス内容を検討する中で、自分自身の知識を整理したいと考えた際に、ナレッジ集を作成していないことに気付きました。同じように感じているエンジニアの方々に向けてサービスを作ろうと考えたのが、開発のきっかけです。

記事作成アプリとして有名なZennやQiitaよりも、気軽にメモできる機能を提供します。<br/>
また、勉強時間の登録機能を追加することで、資格取得や勉強の過程も記録できるようにしました。<br/>

個々のナレッジを集積することで、エンジニアとしての質を向上させることができると考え、開発したのが「skill-log」です。

## 機能一覧
| トップ画面                                                                                      | ログイン画面                                                                  |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
|     ![image](https://github.com/user-attachments/assets/64139140-f716-4b8c-8d9b-6763c98f50bf) |   ![image](https://github.com/user-attachments/assets/0332fca4-91b4-4af0-8f56-82df279c80ca)|
| トップページ(/)をLPの構成にし、訪問者がサービスの内容を理解し、登録してもらいやすくしました。 | Supabeseの認証機能を実装し、安心してユーザーがログインできるようにしました。 |

| お問い合わせ画面                                                                                      | 記事投稿画面　                                                                |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
|     ![image](https://github.com/user-attachments/assets/5d2127ae-880c-4486-8a8d-7edb79bab435) | ![image](https://github.com/user-attachments/assets/7d1f60cc-82d5-488f-933b-a262f4dec74b) |
| お問い合わせの自動返信機能および、Slackに通知機能を追加し、お問い合わせの見逃しを無くすようにしました。 | リッチテキストエディタ機能を追加し、ユーザーが記事を編集しやすいように実装しました。 |



# 使用技術
| Category        | Technology Stack                              |
|-----------------|------------------------------------------------|
| Frontend        | TypeScript, Next.js, scss                      |
| Backend         | TypeScript, Next.js, Prisma                    |
| Infrastructure  | Vercel, Supabase                               |
| Database        | PostgreSQL                                     |
| Design          | Figma, photoshop                               |
| etc.            | ESLint, Prettier, Git, GitHub                  |

# システム構成図
![system](https://github.com/user-attachments/assets/edb0890d-73ec-42c6-9c5a-c246c66546b3)


# ER図
![image](https://github.com/user-attachments/assets/6b873fe7-96a0-4afc-8d81-8c5a0e8ccdda)

# 今後の展望
4つのフェーズに分けて、開発を進めていきたいと考えています。

1. フェーズ 1：機能強化
   現在の機能を強化し、ユーザー体験を向上させるための改善を行います。具体的には、直感的に操作できるよう既存のUI/UXデザインを改善します。また、各機能の操作性を向上させるための改良も実施します。

2. フェーズ 2：新機能の追加
   新たな機能を追加します。具体的には、勉強時間や記事投稿数等に応じてバッジ付与項目を作るなど、新たな価値を提供できるよう導入します。
   また、転職活動の際にポートフォリオとして提出できるような設計も導入します。これにより、サービスの利便性と魅力を高めます。

3. フェーズ 3：管理画面の追加
   ユーザー管理をしやすくするため、管理画面の実装をします。
   お問い合わせ内容や、ユーザーの投稿・各機能の使用頻度や方法を管理することで、ユーザーのニーズに合わせてアプリをアップグレードしていきます。

4. フェーズ 4：パフォーマンスの最適化
   システムのパフォーマンスを最適化し、快適な操作感を提供します。
   具体的には、システムのレスポンス時間を短縮するための最適化を行い、ユーザーがストレスなくサービスを利用できるようにします。
   また、データの読み込み速度や処理速度も向上させます。

# SNS(Instagram)
開発過程などを発信しているSNSアカウントです。<br/>
https://www.instagram.com/kho_code/
