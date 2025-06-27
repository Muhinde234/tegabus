"use client";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ProgressBar
        height="5px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}