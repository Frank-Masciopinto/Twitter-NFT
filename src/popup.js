import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Wallet_ui from '../public/script/components/popup.jsx';
//import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Wallet_ui />
  </React.StrictMode>
);
