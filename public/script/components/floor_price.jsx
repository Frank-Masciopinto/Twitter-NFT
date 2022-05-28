/*global chrome*/
import React, { Component } from 'react';
import * as ReactDOMClient from 'react-dom/client';

let CE_id= "mgikgljaihkbncapdiejigpdfdaegfca"
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


class Display_floor_price extends Component {
    constructor(props){
        super(props)
        //this.get_pubKey_from_wallet = this.get_pubKey_from_wallet.bind(this);
        this.state = { 
          publicKey: localStorage.getItem("wallet_public_key")?localStorage.getItem("wallet_public_key"):sessionStorage.getItem("wallet_public_key"),
          port: chrome.runtime.connect(CE_id),
          market_Data: [],
          text_color: (this.props.bgColor == "rgb(255,%20255,%20255)")?"rgba(0,0,0,1.00)":((this.props.bgColor == "rgb(0,%200,%200)")?"#e7e9ea":"#f7f9f9"), //#f7f9f9 for dim, #e7e9ea for lightout
        }
      }
    async open_port_to_backgroundScript_retrieve_Global_Market_Info() {
        console.log("FP open_port_to_backgroundScript_retrieve_Global_Market_Info()")
        var port = this.state.port;
        port.postMessage({message: "Retrieve NFT Market Info"})
        port.onMessage.addListener((msg) => {
          if (msg.message == "Market Data") {
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
                <aside className='sidebar-NFT-Price-Change' style={{color: this.state.text_color}}>
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