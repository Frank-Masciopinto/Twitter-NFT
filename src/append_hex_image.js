/*global chrome*/
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import HexagonalImage from '../public/script/components/hexagonal_image.jsx';

const root = ReactDOMClient.createRoot(document.getElementsByClassName("twitter-hex-container")[0]);
root.render(
    <HexagonalImage/>
);
