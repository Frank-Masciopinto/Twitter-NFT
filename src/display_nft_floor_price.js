import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Display_floor_price from '../public/script/components/floor_price.jsx';

//import App from '../public/script/wallet_adapter_ts_components/App.tsx'
//import '../public/script/wallet_adapter_ts_components/App.module.css'
let fileUrl = document.currentScript.src;
let defaultColor = "rgb(255, 255, 255)";
if (fileUrl.includes("?color="))
    defaultColor = fileUrl.split("?color=")[1];


const root = ReactDOMClient.createRoot(document.getElementsByClassName("floor-price-main-tab")[0]);
root.render(
    <Display_floor_price bgColor={defaultColor} />
);
