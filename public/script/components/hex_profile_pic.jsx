import React, { Component } from 'react';
import * as ReactDOMClient from 'react-dom/client';

let CE_id= "llppbgmmjainigmgopfnbddgmjjfgocc"


class Display_hexagonal_profile_pic extends Component {
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

            return (
                <div className='hexagonal-profile-pic'>
                    <svg width="240" height="300" viewBox="-1 -1 240 300">
                        <path d="M104,0 L208,60 L208,180 L104,240 L0,180 L0,60z" stroke="black" strokeWidth="1" fill="#64C7CC" />
                    </svg>
                    
                </div>
            )
    }
}
 
export default Display_hexagonal_profile_pic;