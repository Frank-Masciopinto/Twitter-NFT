import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Connect_wallet from '../public/script/components/wallet-adapter.jsx';
import Connect2Phantom from '../public/script/web3_components/connect_wallet.tsx';

//import App from '../public/script/wallet_adapter_ts_components/App.tsx'
//import '../public/script/wallet_adapter_ts_components/App.module.css'

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
    <Connect_wallet />
);
