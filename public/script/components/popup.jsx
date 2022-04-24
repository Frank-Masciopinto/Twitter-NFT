import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class Wallet_ui extends Component {

    state = {
        count: 0,
        logoUrl: '../../icons/logo.jpg'
    }
    styles = {
        fontSize: 30,
        fontWeight: "bold"
    }

    render() { 

        let classes = this.getBadgeClasses();

        return (<div className='main-Popup'>
                    <link rel="stylesheet" href="css/wallet.css" />
                    <link href="css/bootstrap.min.css" rel="stylesheet"/>

                    <div id="top-summary-wallet">
                        <div name="logo" className="css-logo">
                            <img src={this.state.logoUrl} className="chakra-image css-logo-size" />
                        </div>
                        <div name="wallet-name" className="css-wallet-name">
                            <p className="chakra-text css-wallet-name-p">Frank</p>
                        </div>
                        <div name="wallet-balance" className="css-wallet-balance">
                            <div className="css-wallet-balance-innerDiv">◎ 0.00000</div>
                        </div>
                        <div className="css-wallet-mainDiv-balance-usd" style={{bottom: 85}}>
                            <div className="css-wallet-balance-usd">$ 0.00</div>
                        </div>
                        <div className="css-send-solana">
                            <button className="css-send-solana-button btn btn-secondary">Send</button>
                        </div>
                        <div className="css-receive-solana">
                            <button className="css-receive-solana-button btn btn-secondary">Receive</button>
                        </div>
                        
                    </div>
                    <div id="horizontal-divider"></div>
                    <div id="bottom-transactions-history-NFT" className='css-bottom-transaction'>
                        <div role="tablist" aria-orientation="horizontal" class="chakra-tabs__tablist css-1uw5bnh">
                            <button type="button" id="tabs-18--tab-0" role="tab" tabindex="0" aria-selected="true" aria-controls="tabs-18--tabpanel-0" class="chakra-tabs__tab css-jykylc" data-index="0">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" focusable="false" class="chakra-icon css-i1hv63" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M264.4 95.01c-35.6-.06-80.2 11.19-124.2 34.09C96.27 152 61.45 182 41.01 211.3c-20.45 29.2-25.98 56.4-15.92 75.8 10.07 19.3 35.53 30.4 71.22 30.4 35.69.1 80.29-11.2 124.19-34 44-22.9 78.8-53 99.2-82.2 20.5-29.2 25.9-56.4 15.9-75.8-10.1-19.3-35.5-30.49-71.2-30.49zm91.9 70.29c-3.5 15.3-11.1 31-21.8 46.3-22.6 32.3-59.5 63.8-105.7 87.8-46.2 24.1-93.1 36.2-132.5 36.2-18.6 0-35.84-2.8-50.37-8.7l10.59 20.4c10.08 19.4 35.47 30.5 71.18 30.5 35.7 0 80.3-11.2 124.2-34.1 44-22.8 78.8-52.9 99.2-82.2 20.4-29.2 26-56.4 15.9-75.7zm28.8 16.8c11.2 26.7 2.2 59.2-19.2 89.7-18.9 27.1-47.8 53.4-83.6 75.4 11.1 1.2 22.7 1.8 34.5 1.8 49.5 0 94.3-10.6 125.9-27.1 31.7-16.5 49.1-38.1 49.1-59.9 0-21.8-17.4-43.4-49.1-59.9-16.1-8.4-35.7-15.3-57.6-20zm106.7 124.8c-10.2 11.9-24.2 22.4-40.7 31-35 18.2-82.2 29.1-134.3 29.1-21.2 0-41.6-1.8-60.7-5.2-23.2 11.7-46.5 20.4-68.9 26.1 1.2.7 2.4 1.3 3.7 2 31.6 16.5 76.4 27.1 125.9 27.1s94.3-10.6 125.9-27.1c31.7-16.5 49.1-38.1 49.1-59.9z"></path>
                                </svg>
                            </button>
                            <button type="button" id="tabs-18--tab-1" role="tab" tabindex="-1" aria-selected="false" aria-controls="tabs-18--tabpanel-1" class="chakra-tabs__tab css-jykylc" data-index="1">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" focusable="false" class="chakra-icon css-i1hv63" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M480.07 96H160a160 160 0 1 0 114.24 272h91.52A160 160 0 1 0 480.07 96zM248 268a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52H84a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm216 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z"></path>
                                </svg>
                            </button>
                            <button type="button" id="tabs-18--tab-2" role="tab" tabindex="-1" aria-selected="false" aria-controls="tabs-18--tabpanel-2" class="chakra-tabs__tab css-1thn5bl" data-index="2">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" focusable="false" class="chakra-icon css-i1hv63" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8.515 1.019A7 7 0 008 1V0a8 8 0 01.589.022l-.074.997zm2.004.45a7.003 7.003 0 00-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 00-.439-.27l.493-.87a8.025 8.025 0 01.979.654l-.615.789a6.996 6.996 0 00-.418-.302zm1.834 1.79a6.99 6.99 0 00-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 00-.214-.468l.893-.45a7.976 7.976 0 01.45 1.088l-.95.313a7.023 7.023 0 00-.179-.483zm.53 2.507a6.991 6.991 0 00-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 01-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 01-.401.432l-.707-.707z" clip-rule="evenodd"></path>
                                    <path fill-rule="evenodd" d="M8 1a7 7 0 104.95 11.95l.707.707A8.001 8.001 0 118 0v1z" clip-rule="evenodd"></path>
                                    <path fill-rule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                </div>);
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.state.count === 0 ? "warning" : "primary";
        return classes;
    }

    formatcount() {
        const { count } = this.state;
        return count === 0 ? 'zero' : count
    }

}
 
export default Wallet_ui;

{/* <FontAwesomeIcon icon={faCoffee} />
<i className='fa-solid fa-alarm-exclamation'></i>
<h1 style={this.styles} className={this.getBadgeClasses()}>{this.formatcount()}</h1>
<button className='btn btn-secondary'>Create New Wallet</button> */}