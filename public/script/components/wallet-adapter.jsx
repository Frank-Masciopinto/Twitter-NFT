
import React, { Component } from 'react';
//import '../../css/nft-Gallery.css';
var http = require('http');

let nonce_for_login = 666
let CE_id = "llppbgmmjainigmgopfnbddgmjjfgocc"

class Connect_wallet extends Component {
  constructor(){
    super()
    this.spawn_NFTs_images_in_Twitter_gallery = this.spawn_NFTs_images_in_Twitter_gallery.bind(this);
    this.getProvider = this.getProvider.bind(this);
    this.state = { 
      LS: {
        getAllItems: () => chrome.storage.local.get(),
        getItem: async key => (await chrome.storage.local.get(key))[key],
        setItem: (key, val) => chrome.storage.local.set({[key]: val}),
        removeItems: keys => chrome.storage.local.remove(keys),
      },
      publicKey: "AUtkztdM4ssoCnMBPjRUK8wXR9q7WT5eAepvZkTUPM1"//this.state.LS.getItem("publicKey")  <<<---- use this for saved pk
     } 
  }
    async getProvider () {
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

            console.log(provider.publicKey)
            chrome.runtime.sendMessage(CE_id, {message: "Nonce Signed Successfully", publicKey: this.state.publicKey}, (response_nft_list) => {
              console.log(response_nft_list)
              if (response_nft_list != "No NFTs Found") {//if we have NFTs in list, spawn the images in gallery
                this.spawn_NFTs_images_in_Twitter_gallery(response_nft_list["nft_List"])
              }
            })

            //return provider;
          }
        } else {
          alert("NO Wallet Detected");
        }
    };

    async get_NFTs_from_loggedIn_wallet() {
      console.log("--> get_NFTs_from_loggedIn_wallet()")
      chrome.runtime.sendMessage(CE_id, {message: "Nonce Signed Successfully", publicKey: this.state.publicKey}, (response_nft_list) => {
        console.log(response_nft_list)
        if (response_nft_list != "No NFTs Found") {//if we have NFTs in list, spawn the images in gallery
          this.spawn_NFTs_images_in_Twitter_gallery(response_nft_list["nft_List"])
        }
      })
    }

    async spawn_NFTs_images_in_Twitter_gallery (NFTs_List) {
      console.log("spawn_NFTs_images_in_Twitter_gallery()")
      document.getElementById("connect-solana-wallet").remove()
      let nft_gallery_div = document.createElement("div")
      nft_gallery_div.id = "NFT-Gallery-Container"
      document.getElementById("root").appendChild(nft_gallery_div)
      console.log(NFTs_List.length)
      for (let i=0; i < NFTs_List.length; i++) {
        console.log("Inside loop")
        await this.spawn_one_nft_img(NFTs_List[i], nft_gallery_div)
      }
    }
    async spawn_one_nft_img (nft_image, nft_gallery_div) {
      console.log("spawn_one_nft_img()")
      return new Promise((res, rej) => {
        let nft_img_element = document.createElement("img")
        nft_img_element.className = "NFT-Gallery-Element"
        nft_img_element.src = nft_image["blob"]
        nft_gallery_div.appendChild(nft_img_element)
        res()
      })
    }

    render() { 
      if (this.state.LS.getItem("public_Key") == undefined) { //if never logged in before, connect wallet
        return (
            <button id='connect-solana-wallet' onClick={this.getProvider}>Connect Your Solana Wallet</button>
        );
      }
      else {
        return (
          <button id='connect-solana-wallet' onClick={this.getProvider}>Confnect Your Solanaq Wallet</button>
      );
      }
    }
}
 
export default Connect_wallet;

