'use client';

import "../globals.scss";
import { useRouteGuard } from "./_hooks/useRouteGuard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useRouteGuard();

  return (
    <>
      {children}
    </>
  );
};