import type { AppProps } from "next/app";
import Head from "next/head";
import { Web3Providers } from "../components/providers/Web3Providers";

import "@rainbow-me/rainbowkit/styles.css";
import "../globals.css";
import { GameStateProvider } from "../components/providers/GameStateContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Providers>
      <GameStateProvider>
        <Head>
          <title>EVM Casino</title>
        </Head>
        <div className="overflow-hidden w-screen h-screen">
          <Component {...pageProps} />
        </div>
      </GameStateProvider>
    </Web3Providers>
  );
}
