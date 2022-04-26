import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from '../public/script/wallet_adapter_ts_components/App.tsx';

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
