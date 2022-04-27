import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
//import Wallet_adapter from '../public/script/components/wallet-adapter.jsx';
import App from '../public/script/wallet_adapter_ts_components/App.tsx';

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
