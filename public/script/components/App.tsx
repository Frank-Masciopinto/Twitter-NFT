import React, { useMemo }  from "react";
import "./App.css";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import MyWallet from "./MyWallet.tsx";

function App() {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Testnet;
    console.log("NETWORK", network)
    // You can also provide a custom RPC endpoint
    const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);
    console.log("ENDPOINT", endpoint)
  
    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = useMemo(
      () => [
          new PhantomWalletAdapter(),
          new GlowWalletAdapter(),
          new SlopeWalletAdapter(),
          new SolflareWalletAdapter({ network }),
          new TorusWalletAdapter(),
      ],
      [network]
  );
    return (
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <div className="App">
                <MyWallet />
            </div>
          </WalletProvider>
        </ConnectionProvider>
    );
}
    
export default App;