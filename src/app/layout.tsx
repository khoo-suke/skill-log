import { Header } from '@/app/_components/Header';
import { Footer } from '@/app/_components/Footer';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.scss';
import { Roboto } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({ subsets:["latin"], weight: ["400","500","600","700","800"]})
const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500','700'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="ja">
      <body className={notoSansJP.className}>
          <Header />
          <main>
            {children}
          </main>
        <Footer />
      </body>
    </html>
    </>
  );
}
