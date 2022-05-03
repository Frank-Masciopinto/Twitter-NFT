
import React, { Component } from 'react';

let nonce_for_login = 666

class Connect_wallet extends Component {
  constructor(){
    super()
    this.spawn_NFTs_images_in_Twitter_gallery = this.spawn_NFTs_images_in_Twitter_gallery.bind(this);
    this.getProvider = this.getProvider.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    //this.listen_for_messages = this.listen_for_messages.bind(this);
    this.state = { 
      CE_id: "llppbgmmjainigmgopfnbddgmjjfgocc",
      publicKey: "AUtkztdM4ssoCnMBPjRUK8wXR9q7WT5eAepvZkTUPM1"//this.state.LS.getItem("publicKey")  <<<---- use this for saved pk
     } 
  }

  async open_port_to_backgroundScript_retrieve_all_NFTs() {
    var port = chrome.runtime.connect(this.state.CE_id);
    port.postMessage({message: "Nonce Signed Successfully", publicKey: this.state.publicKey})
    port.onMessage.addListener(function(msg) {
      console.log(msg)
      if (msg.message == "One NFT in base64")
        if (!document.querySelector("#NFT-Gallery-Container")) {
          create_NFTs_Gallery_container()
        } 
        spawn_one_nft_img(msg.single_NFT)
    });

    async function spawn_one_nft_img (nft_image) {
      console.log("spawn_one_nft_img()")
      return new Promise((res, rej) => {
        let nft_gallery_div = document.getElementById("NFT-Gallery-Container")
        let nft_img_element = document.createElement("img")
        nft_img_element.className = "NFT-Gallery-Element"
        nft_img_element.src = nft_image["base64"]
        nft_gallery_div.appendChild(nft_img_element)
        res()
      })
    }
    function create_NFTs_Gallery_container() {
      console.log("create_NFTs_Gallery_container()")
      document.getElementById("connect-solana-wallet").remove()
      let nft_gallery_div = document.createElement("div")
      nft_gallery_div.id = "NFT-Gallery-Container"
      document.getElementById("root").appendChild(nft_gallery_div)
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
          this.open_port_to_backgroundScript_retrieve_all_NFTs()
        }
      } else {
        alert("NO Wallet Detected");
      }
  };

  async get_NFTs_from_loggedIn_wallet() {
    console.log("--> get_NFTs_from_loggedIn_wallet()")
    chrome.runtime.sendMessage(this.state.CE_id, {message: "Nonce Signed Successfully", publicKey: this.state.publicKey}, (response_nft_list) => {
      console.log(response_nft_list)
      if (response_nft_list != "No NFTs Found") {//if we have NFTs in list, spawn the images in gallery
        this.spawn_NFTs_images_in_Twitter_gallery(response_nft_list["nft_List"])
      }
    })
  }

  async sendMessage(messageToExtension) {
    return new Promise((res, rej) => {
      chrome.runtime.sendMessage(this.state.CE_id, {message: messageToExtension}, (response) => {res(response)})
    })
  }

  async spawn_NFTs_images_in_Twitter_gallery (NFTs_List) {
      console.log(NFTs_List.length)
      for (let i=0; i < NFTs_List.length; i++) {
        console.log("Inside loop")
        await this.spawn_one_nft_img(NFTs_List[i])
      }
  }

    render() { 
      if (this.publicKey == null) { //if never logged in before, connect wallet
        return (
            <button id='connect-solana-wallet' onClick={this.getProvider}>Connect Your Solana Wallet</button>
        );
      }
      else {
        return (
            <button id='connect-solana-wallet' onClick={this.getProvider}>Already Connected</button>
      );
      }
    }
}
 
export default Connect_wallet;

