import type { AppProps } from "next/app";
import { Web3Providers } from "../components/providers/Web3Providers";

import "@rainbow-me/rainbowkit/styles.css";
import "../globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Providers>
      <Component {...pageProps} />
    </Web3Providers>
  );
}
