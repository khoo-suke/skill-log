import "../globals.scss";
import MypageHeader from "./_components/MypageHeader/MypageHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <MypageHeader />
        {children}
      </body>
    </html>
  )
}