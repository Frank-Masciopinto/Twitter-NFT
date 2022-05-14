import React, { Component } from 'react';
import * as ReactDOMClient from 'react-dom/client';

let CE_id= "llppbgmmjainigmgopfnbddgmjjfgocc"

class Display_floor_price extends Component {
    constructor(){
        super()
        //this.get_pubKey_from_wallet = this.get_pubKey_from_wallet.bind(this);
        
        this.state = { 
          publicKey: undefined,
          port: chrome.runtime.connect(CE_id),
          nft_price_change_list: []
        } 
      }
    render() { 
        return (
            <aside className='sidebar-NFT-Price-Change'>
                <h2 className='sidebar-NFT-Title'>NFTs by Sales Volume</h2>
            </aside>
        );
    }
}
 
export default Display_floor_price;