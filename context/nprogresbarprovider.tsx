"use client";

import { AppProgressBar } from "next-nprogress-bar";

export default function NProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AppProgressBar
        height="4px"
        color="#0B3B2E"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
