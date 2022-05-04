
import React, { Component } from 'react';

let nonce_for_login = 666

class Connect_wallet extends Component {
  constructor(){
    super()
    this.getProvider = this.getProvider.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    //this.listen_for_messages = this.listen_for_messages.bind(this);
    this.state = { 
      CE_id: "llppbgmmjainigmgopfnbddgmjjfgocc",
      publicKey: "AUtkztdM4ssoCnMBPjRUK8wXR9q7WT5eAepvZkTUPM1"//this.state.LS.getItem("publicKey")  <<<---- use this for saved pk
     } 
  }

  async open_port_to_backgroundScript_retrieve_all_NFTs() {
    console.log("open_port_to_backgroundScript_retrieve_all_NFTs()")
    var port = chrome.runtime.connect(this.state.CE_id);
    port.postMessage({message: "Nonce Signed Successfully", publicKey: this.state.publicKey})
    port.onMessage.addListener(function(msg) {
      console.log(msg)
      if (msg.message == "One NFT in base64") {
        if (!document.querySelector("#NFT-Gallery-Container")) {
          create_NFTs_Gallery_container()
        } 
        spawn_one_nft_img(msg.single_NFT)
      }
    });

    async function spawn_one_nft_img (nft_obj) {
      console.log("spawn_one_nft_img()")
      return new Promise((res, rej) => {
        let nft_gallery_div = document.getElementById("NFT-Gallery-Container")
        //Create NFT Container to display img, title & all infos
        let nft_container = document.createElement("div")
        nft_container.className = "single-nft-container"
        //Create Img
        let nft_img_element = document.createElement("img")
        nft_img_element.className = "NFT-Gallery-Element"
        nft_img_element.src = nft_obj["base64"]
        nft_img_element.href = nft_obj["external_url"]
        nft_img_element.onclick = function() {
          window.location.href = nft_obj["Properties"]["external_url"];
      };
        nft_container.appendChild(nft_img_element)
        //Create Title
        let nft_title = document.createElement("h2")
        nft_title.innerText = nft_obj["Title"]
        nft_title.className = "NFT-title"
        nft_container.appendChild(nft_title)
        //Create Collection Name
        let collection_name = document.createElement("p")
        collection_name.innerText = nft_obj["nft_collection"]["title"]
        collection_name.className = "NFT-collection-name underlined-pointer-cursor"
        collection_name.onclick = function() {
          window.location.href = nft_obj["Properties"]["external_url"];
      };
        nft_container.appendChild(collection_name)
        //Create Twitter + Discord Buttons
        let buttons_nft_container = document.createElement("div")
        buttons_nft_container.className = "buttons_nft_container"
        let twitter_btn = document.createElement("a")
        twitter_btn.className = "twitter-nft-btn"
        twitter_btn.href = nft_obj["nft_collection"]["twitter"]
        twitter_btn.innerText = "Twitter"
        let discord_btn = document.createElement("a")
        discord_btn.className = "discord-nft-btn"
        discord_btn.href = "https://" + nft_obj["nft_collection"]["discord"]
        discord_btn.innerText = "Discord"
        
        buttons_nft_container.appendChild(twitter_btn)
        buttons_nft_container.appendChild(discord_btn)
        nft_container.appendChild(buttons_nft_container)
        //Create

        nft_gallery_div.appendChild(nft_container)
        res()
      })
    }
    function create_NFTs_Gallery_container() {
      console.log("create_NFTs_Gallery_container()")
      if (document.querySelector("#connect-solana-wallet")) {
        document.getElementById("connect-solana-wallet").remove()
      }
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

  async sendMessage(messageToExtension) {
    return new Promise((res, rej) => {
      chrome.runtime.sendMessage(this.state.CE_id, {message: messageToExtension}, (response) => {res(response)})
    })
  }

    render() { 
      if (this.state.publicKey == null) { //if never logged in before, connect wallet to fetch pk
        return (
            <button id='connect-solana-wallet' onClick={this.getProvider}>Connect Your Solana Wallet</button>
        );
      }
      else {
        this.open_port_to_backgroundScript_retrieve_all_NFTs()
        return (
          <div id='NFT-Gallery-Container'></div>
      );
      }
    }
}
 
export default Connect_wallet;

