"use client";

import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { polygonMumbai, polygon, mainnet } from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
// import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, provider } = configureChains(
  [polygonMumbai, polygon, mainnet],
  [/* alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), */ publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "EVM Casino",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize="wide"
        theme={lightTheme({
          accentColor: "blue",
          borderRadius: "small",
        })}
        coolMode
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
