const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({[key]: val}),
    removeItems: keys => chrome.storage.local.remove(keys),
  };

let API_retrieve_all_NFTs_from_wallet = "https://api.all.art/v1/wallet/"
let API_Cryptoslam_top100_24hr = "https://api.cryptoslam.io/v1/collections/top-100?timeRange=day"
let currentTabId = "";

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log(request)
    if (request.message == "connect wallet") {
        console.log(sender.tab)
        chrome.scripting.executeScript({
            target: {tabId: sender.tab.id},
            files: ["./display_nft_Gallery.js"]
        });
        sendResponse({response: "Injected display_nft_Gallery.js"})
    }
})
chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
    console.log("***From Injected Script***")
    console.log(request)
    if (request.message == "What is the publicKey?") {
        let pk = await LS.getItem("public_Key")
        console.log(pk)
        sendResponse(pk)
    }
})

chrome.runtime.onConnectExternal.addListener(function(port) {
    port.onMessage.addListener(async function(msg) {
        console.log("35",msg);
        //await LS.setItem("hexaImage", "https://picsum.photos/200");
        if (msg.message == "Nonce Signed Successfully") {
            await LS.setItem("public_Key", msg.publicKey)
            console.log("PUBLIC KEY", msg.publicKey)
            let nft_list = await retrieve_all_NFTs_owned_by_wallet(msg.publicKey, port)
            console.log("NFTs Retrieved:",nft_list)
        }
        else if (msg.message == "Retrieve NFT Market Info") {
            console.log("KEY IMAGE", await LS.getItem("hexa_profile_image"));
            retrieve_ETH_Market_Info(port)
        }
        else if(msg.message == 'get_base64'){
           let data = await convert_NFTs_to_base64(msg.publicKey);
            port.postMessage({message: "base64_response", data: data})
        }else if(msg.message == 'hexagon_get_base64'){
           let data = await convert_NFTs_to_base64(msg.publicKey);
            console.log("I M IN BASE 47", msg.publicKey, msg.action, currentTabId, data);
            if (msg.action == "reload"){
                if (currentTabId == ""){
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                        chrome.tabs.sendMessage(tabs[0].id, {action: "reload_tweets_hexa", data:data}, function(response) {});  
                    });
                }else{
                    chrome.tabs.sendMessage(currentTabId, {message: "reload_tweets_hexa", data:data}, (response) => {})
                }                
            }
            port.postMessage({message: "base64_response", data: data})
        }
    });
  });

async function retrieve_all_NFTs_owned_by_wallet(publicKey, port) {
    return new Promise(async (res, rej) => {
        console.log("**Fetching all owned NFTs, Public Key Below***")
        console.log("51",publicKey)

        let api_URL = API_retrieve_all_NFTs_from_wallet + publicKey
    
        fetch(api_URL, {
    
        // Adding method type
        method: "GET",
    })
    // Converting to JSON
    .then(response => response.json())
    
    .then(async (json) => {
        if (json["_id"]) {//If wallet contain any NFT
            console.log("LINE 64",json["unlistedNfts"])
            let all_NFTs_list = json["unlistedNfts"]
            var all_NFTs_without_base64 = json["unlistedNfts"];
            //For single NFT convert to b64
            for (let i=0; i < all_NFTs_list.length; i++) {
                let base_64_img;
                base_64_img = await convert_NFTs_to_base64(all_NFTs_list[i]["Preview_URL"])
                all_NFTs_list[i]["base64"] = base_64_img;
                port.postMessage({message: "One NFT in base64", single_NFT: all_NFTs_list[i]})
            }
            for (let i=0; i < all_NFTs_without_base64.length; i++) {
                all_NFTs_without_base64[i]["base64"] = "";
            }
            console.log("BEFORE LOCAL", JSON.stringify(all_NFTs_without_base64));
            await LS.setItem("all_owned_NFTs", JSON.stringify(all_NFTs_without_base64))
            res(all_NFTs_list)
    
        }
        else {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: './icons/icon_128.png',
                title: `Solana - No NFTs Found`,
                message: "No NFTs were found in your wallet.",
                priority: 1
                })
            res("No NFTs Found")
        }
    })
    
    .catch(function (err) {
        console.log(err)
        // chrome.notifications.create({
        //     type: 'basic',
        //     iconUrl: './icons/icon_128.png',
        //     title: `Solana - Error`,
        //     message: JSON.stringify(err),
        //     priority: 1
        // })
        res("No NFTs Found")
    })
})
}

async function retrieve_ETH_Market_Info(port) {
    return new Promise(async (res, rej) => {
        console.log("Retrieve_ETH_Market_Info()")
        let api_URL = API_Cryptoslam_top100_24hr
    
        fetch(api_URL, {
    
        // Adding method type
        method: "GET",
    })
    // Converting to JSON
    .then(response => response.json())
    
    .then(async (json) => {
        console.log("Received collections:")
        console.log(json)
        let marketData_top20 = [];
        if (json.length){
            marketData_top20 = json.slice(0,7)  
            for (let i=0; i < marketData_top20.length; i++) {
                let base_64_icon = await convert_NFTs_to_base64(marketData_top20[i]["iconUrl"])
                marketData_top20[i]["base64"] = base_64_icon
            }            
        }
        port.postMessage({message: "Market Data", market_Data: marketData_top20})
        res(marketData_top20)

    })
    
    .catch(function (err) {
        console.log(err)
        // chrome.notifications.create({
        //     type: 'basic',
        //     iconUrl: './icons/icon_128.png',
        //     title: `Solana - Error`,
        //     message: JSON.stringify(err),
        //     priority: 1
        // })
        res("No NFTs Found")
    })
})
}

const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

async function convert_NFTs_to_base64(NFT_url) {
    return new Promise(async (res, rej) => {
        console.log("***convert_NFTs_to_base64()***")
        await fetch(NFT_url).then(r => r.blob()).then(blob => blobToBase64(blob).then(b64 => res(b64)));
    })
}

chrome.tabs.onActivated.addListener(tab => {
//Check if Linkedin is in the url
currentTabId = tab.tabId;
chrome.tabs.get(tab.tabId, function(tab) {
    if(chrome.runtime.lastError) {
        console.log("Inside runtime error")
    }
    else {
        try {
            inject_Js(tab.url, tab.tabId)
        }
        catch {
        console.log("Inside tab is  undefined")
        }
    }
})
function inject_Js(link, tabId){
    if (link.includes("chrome://") || link.includes("developer.chrome.com") || link.includes("chrome-extension://") || link.includes("chrome-error://") || link.includes("chrome.google.com/webstore") || link.includes("about:") || link.includes("addons.mozilla.org") || link.includes("moz-extension://")){
        console.log("Inside google chrome")
    }
    else {
        check_than_Insert_JS("contentScript.js", "google.css", tabId, link)
    }
}});

//On Every new tab Update
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

var existCondition = setInterval(function() {
    //console.log("CHECK HERE: ", changeInfo)
    if (changeInfo.status == "complete") {
        console.log("DOM Loaded!");
        clearInterval(existCondition);
        inject_javascript();
    }
    }, 2000);


function inject_javascript(){
    console.log("Inside On Updated")
    //Check if Linkedin is in the url
        chrome.tabs.get(tabId, function(tab) {
            if(chrome.runtime.lastError) {
                console.log("Inside runtime error")
            }
            else {
                try {
                    inject_Js(tab.url, tabId)
                }
                catch {
                console.log("Inside tab is  undefined")
                }
            }
        })



    function inject_Js(link, tabId){
        console.log("Inside Inject js onupdated")

        if (link.includes("chrome://") || link.includes("chrome-extension://") || link.includes("developer.chrome.com") || link.includes("chrome.google.com/webstore") || link.includes("about:") || link.includes("addons.mozilla.org") || link.includes("moz-extension://")){
            console.log("UPDATED Inside google chrome")
        }
        else if (link.includes("twitter.com")){
            check_than_Insert_JS("contentScript.js", "NO_CSS", tabId, link)
        }

}}});

function check_than_Insert_JS(js_File_Name, css_File_Name, tabId, tabUrl=undefined){

let content_Message = "are_you_there_content_script?"
if (tabUrl.includes("home"))
    chrome.tabs.sendMessage(tabId, {message: "home_hexa_image"}, (response) => {})

chrome.tabs.sendMessage(tabId, {message: content_Message}, function(msg) {
    msg = msg || {};
    if(chrome.runtime.lastError) {
        console.log("Inside runtime error, NO SCRIPT IS THERE! ------+++++ new function---> " + js_File_Name)
        if (css_File_Name != "NO_CSS")  {
            chrome.scripting.insertCSS({
                target: {tabId: tabId},
                files: ["./style/"+css_File_Name]
                }, () => {
                const lastError = chrome.runtime.lastError;
                if (lastError) {
                    return notify(lastError);
                }
            })}
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["./"+js_File_Name]
        });
    }
    else if(msg.status != 'yes') {
        if (css_File_Name != "NO_CSS")  {
            chrome.scripting.insertCSS({
                target: {tabId: tabId},
                files: ["./style/"+css_File_Name]
                }, () => {
                const lastError = chrome.runtime.lastError;
                if (lastError) {
                    return notify(lastError);
                }
            })}
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["./"+js_File_Name]
        });
    }
    else if(msg.status == 'get_base64'){
        console.log("I M IN BASE54", msg)
        return new Promise(async (res, rej) => {
            console.log("***convert_NFTs_to_base64()***")
            await convert_NFTs_to_base64(msg.url).then(b64 => res(b64));
        })
    }
    else {//Already present content script - Send message to activate functions
        chrome.tabs.sendMessage(tabId, {message: "Changed Linkedin URL"}, (response) => {})
        console.log("already injected js => " + js_File_Name)
    }

});


}

chrome.runtime.onInstalled.addListener(async (details) => {
if(details.reason == "install"){

    console.log("ONINSTALL STORAGE SET UP")
    await LS.setItem("all_favorites", [])
}});