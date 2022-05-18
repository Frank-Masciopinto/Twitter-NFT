import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Display_hexagonal_profile_pic from '../public/script/components/hex_profile_pic.jsx';

//import App from '../public/script/wallet_adapter_ts_components/App.tsx'
//import '../public/script/wallet_adapter_ts_components/App.module.css'

const root = ReactDOMClient.createRoot(document.getElementsByClassName("new_profile_pic_container")[0]);
root.render(
    <Display_hexagonal_profile_pic />
);
