import React, { Component } from 'react';
import * as ReactDOMClient from 'react-dom/client';

let CE_id= "llppbgmmjainigmgopfnbddgmjjfgocc"
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


class Display_floor_price extends Component {
    constructor(){
        super()
        //this.get_pubKey_from_wallet = this.get_pubKey_from_wallet.bind(this);
        
        this.state = { 
          publicKey: undefined,
          port: chrome.runtime.connect(CE_id),
          market_Data: []
        } 
      }
    async open_port_to_backgroundScript_retrieve_Global_Market_Info() {
        console.log("open_port_to_backgroundScript_retrieve_Global_Market_Info()")
        var port = this.state.port;
        port.postMessage({message: "Retrieve NFT Market Info"})
        port.onMessage.addListener((msg) => {
          console.log(msg)
          if (msg.message == "Market Data") {
            console.log(this.state)
            this.setState({ market_Data: [...this.state.market_Data, ...msg.market_Data] })
          }
        });
    }
    getChangeClasses(changeInValueUSD) {
        let classes = "24hr_percent_change ";
        if (changeInValueUSD == null) {
            return classes
        }
        else {
            classes += changeInValueUSD > 0 ? "green" : "red";
            return classes;
        }
    }
    render() { 
        if (this.state.market_Data.length == 0) {
            this.open_port_to_backgroundScript_retrieve_Global_Market_Info()
        }
        else {
            return (
                <aside className='sidebar-NFT-Price-Change'>
                    <h2 className='sidebar-NFT-Title'>NFTs by Sales Volume</h2>
                    <ul id='NFT-rank-chart'>
                    {this.state.market_Data.map((nft_obj, index) => 
                        <li className="single-nft-chart-container" key={index}>
                            <img src={nft_obj.base64} className="NFT-Rank-Icon" />
                            <div className="NFT-column-Change-24hr">
                                <p className='NFT-rank-collection-title'>{nft_obj.contractName}</p>
                                <p className='sales_value'>{formatter.format(nft_obj.valueUSD)}</p>
                            </div>
                            <p className={this.getChangeClasses(nft_obj.changeInValueUSD)}>{nft_obj.changeInValueUSD != null ? nft_obj.changeInValueUSD.toFixed(2) + "%" : "0%"}</p>
                        </li>
                    )}
                    </ul>
                </aside>
            )
        }
    }
}
 
export default Display_floor_price;