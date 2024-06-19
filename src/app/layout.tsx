import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Foooter";
import './globals.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="ja">
      <body>
        <Header pattern="default"/>
          {children}
        <Footer />
      </body>
    </html>
    </>
  );
}
