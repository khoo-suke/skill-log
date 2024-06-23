import Header from "@/app/_components/Header/index";
import Footer from "@/app/_components/Footer/index";
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
