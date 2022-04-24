import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Wallet_ui from '../public/script/components/popup.jsx';
//import '../public/css/wallet.css'

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Wallet_ui />
  </React.StrictMode>
);
