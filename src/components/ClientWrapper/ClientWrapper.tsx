"use client";

import { useLoadingInterceptor } from "@/hooks/useLoadingInterceptor";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useLoadingInterceptor();
  return <>{children}</>;
}
