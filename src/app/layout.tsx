import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Foooter";
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
        <Header />
          {children}
        <Footer />
      </body>
    </html>
    </>
  );
}
