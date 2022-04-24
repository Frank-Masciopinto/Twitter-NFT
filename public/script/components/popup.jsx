import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class Wallet_ui extends Component {

    state = {
        count: 0,
        logoUrl: 'https://picsum.photos/200'
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
                            <p className="chakra-text css-1rzgo6g">ciao</p>
                        </div>
                        <div name="wallet-balance" className="css-wallet-balance">
                            <div className="css-wallet-balance-innerDiv">0
                            ₳</div>
                        </div>
                        <div className="css-wallet-mainDiv-balance-usd" style={{bottom: 85}}>
                            <div className="css-wallet-balance-usd">$0.0</div>
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
                    
                    </div>
                    <FontAwesomeIcon icon={faCoffee} />
                    <i className='fa-solid fa-alarm-exclamation'></i>
                    <h1 style={this.styles} className={this.getBadgeClasses()}>{this.formatcount()}</h1>
                    <button className='btn btn-secondary'>Create New Wallet</button>
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