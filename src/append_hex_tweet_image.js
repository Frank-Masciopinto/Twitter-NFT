/*global chrome*/
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import HexagonalTweetImage from '../public/script/components/hexagonal_tweet_image.jsx';

let fileUrl = document.currentScript.src;
let targetClass = "twitter-profile-hex-container";
if (fileUrl.includes("?id=")){
    let uniqueId = fileUrl.split("?id=")[1];
    targetClass = targetClass + "_" + uniqueId;
}
const root = ReactDOMClient.createRoot(document.getElementsByClassName(targetClass)[0]);
root.render(
    <HexagonalTweetImage/>
);
