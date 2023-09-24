"use client";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "./components/Navbar";

const font = Montserrat({ subsets: ["latin"] });

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, polygonMumbai } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon, polygonMumbai];
const projectId = "4581d09369460e15ebf8662f5cc0252b";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Blockchain and web3 application for musicians and their fans"
          />
          <meta
            name="keywords"
            content="blockchain, web3, smart contracts, nft, defi"
          />
          <meta name="author" content="Soufiane Masad" />

          <link rel="icon" href="favicon.ico" type="image/x-icon" />

          <title>Connectify | A hub for Artists and Fans</title>
        </head>
        <body className={font.className}>
          <WagmiConfig config={wagmiConfig}>
            <Navbar />
            {children}
          </WagmiConfig>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </body>
      </html>
    </>
  );
}
