import Header from "@/app/_components/Header";
import '@/app/globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <>
      <Header pattern="thanks"/>
        {children}
    </>
  );
}
