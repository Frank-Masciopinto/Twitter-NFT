
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as ReactDOMClient from 'react-dom/client';


let nonce_for_login = 666
let CE_id= "llppbgmmjainigmgopfnbddgmjjfgocc"

class Connect_wallet extends Component {
  constructor(){
    super()
    this.get_pubKey_from_wallet = this.get_pubKey_from_wallet.bind(this);
    this.open_port_to_backgroundScript_retrieve_all_NFTs = this.open_port_to_backgroundScript_retrieve_all_NFTs.bind(this);
    this.ask_pub_key_to_bgScript = this.ask_pub_key_to_bgScript.bind(this);
    //this.listen_for_messages = this.listen_for_messages.bind(this);
    this.state = { 
      publicKey: "8asRqCcgpkzJbenffHcufwDBq1ZSvZEqg3GH91FpGzFw", //undefined
      port: chrome.runtime.connect(CE_id),
      nft_list: []
    } 
  }
  componentDidMount() {
    if (this.state.publicKey == undefined || typeof this.state.publicKey === 'object') { 
      console.log("Before setState")
      
      this.ask_pub_key_to_bgScript("What is the publicKey?");
      console.log("After setState")
    }
}
  async open_port_to_backgroundScript_retrieve_all_NFTs() {
    console.log("open_port_to_backgroundScript_retrieve_all_NFTs()")
    setTimeout(() => {
      if (document.querySelector('[aria-labelledby*="accessible-list"]')) {//remove last section at bottom page
        document.querySelector('[aria-labelledby*="accessible-list"]').remove()
      }
    }, 100);
    var port = this.state.port;
    port.postMessage({message: "Nonce Signed Successfully", publicKey: this.state.publicKey})
    port.onMessage.addListener((msg) => {
      console.log(msg)
      if (msg.message == "One NFT in base64") {
        console.log(this.state)
        this.setState({ nft_list: [...this.state.nft_list, msg.single_NFT] })
      }
    });
  }
  async get_pubKey_from_wallet() {
      if ("solana" in window) {
  
        // opens wallet to connect to
        await window.solana.connect(); 
  
        const provider = window.solana;
        if (provider.isPhantom) {
          console.log("Is Phantom installed?  ", provider.isPhantom);
          //Request a signature with user wallet
          // let message = nonce_for_login
          // let encodedMessage = new TextEncoder().encode(message);
          // let signedMessage = await window.solana.signMessage(encodedMessage, "utf8");

          console.log(provider.publicKey.toString())
          this.setState({publicKey: provider.publicKey.toString()})
        }
      } else {
        alert("NO Wallet Detected");
      }
  };

  async ask_pub_key_to_bgScript(messageToExtension) {
      chrome.runtime.sendMessage(CE_id, {message: messageToExtension}, (response) => {
        console.log("Response pk received from background")
        console.log(response)
        this.setState({ publicKey: (response)})
      })
  }
    render() { 
      if (this.state.publicKey == undefined || typeof this.state.publicKey === 'object') { //if never logged in before, connect wallet to fetch pk
        console.log(this.state.publicKey)
        return (
            <button id='connect-solana-wallet' onClick={this.get_pubKey_from_wallet}>Connect Your Solana Wallet</button>
        );
      }
      else {
        console.log("Already Have a PK- getting all NFTS")
        if (this.state.nft_list.length < 1) {
          this.open_port_to_backgroundScript_retrieve_all_NFTs()
        }
        return (
          <ul id='NFT-Gallery-Container'>
             {this.state.nft_list.map(nft_obj => 
              <li className="single-nft-container" key={nft_obj["_id"]}>
                <img src={nft_obj["base64"]} className="NFT-Gallery-Element" href={nft_obj["external_url"]} />
                <h2 className='NFT-title'>{nft_obj["Title"]}</h2>
                <p onClick={() => { window.location.href = nft_obj["Properties"]["external_url"]}} className='NFT-collection-name underlined-pointer-cursor'>{nft_obj["nft_collection"]["title"]}</p>
                <div className="buttons_nft_container">
                  <a href={nft_obj["nft_collection"]["twitter"]} className='twitter-nft-btn'>
                    <svg id='twitter-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill='currentColor' d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                </div>
              </li>
            )}
          </ul>
      );
      }
    }
}
 
export default Connect_wallet;

