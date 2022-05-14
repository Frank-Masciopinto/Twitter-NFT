const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({[key]: val}),
    removeItems: keys => chrome.storage.local.remove(keys),
  };

let API_retrieve_all_NFTs_from_wallet = "https://api.all.art/v1/wallet/"

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
      console.log(msg);
      if (msg.message == "Nonce Signed Successfully") {
        await LS.setItem("public_Key", msg.publicKey)
        let nft_list = await retrieve_all_NFTs_owned_by_wallet(msg.publicKey, port)
        console.log("NFTs Retrieved")
        console.log(nft_list)
    }
    });
  });

async function retrieve_all_NFTs_owned_by_wallet(publicKey, port) {
    return new Promise(async (res, rej) => {
        console.log("**Fetching all owned NFTs, Public Key Below***")
        console.log(publicKey)
        let api_URL = API_retrieve_all_NFTs_from_wallet + publicKey
    
        fetch(api_URL, {
    
        // Adding method type
        method: "GET",
    })
    // Converting to JSON
    .then(response => response.json())
    
    .then(async (json) => {
        if (json["_id"]) {//If wallet contain any NFT
            console.log(json["unlistedNfts"])
            let all_NFTs_list = json["unlistedNfts"]
            //For single NFT convert to b64
            for (let i=0; i < all_NFTs_list.length; i++) {
                let base_64_img;
                base_64_img = await convert_NFTs_to_base64(all_NFTs_list[i]["Preview_URL"])
                all_NFTs_list[i]["base64"] = base_64_img
                port.postMessage({message: "One NFT in base64", single_NFT: all_NFTs_list[i]})
            }
            
            await LS.setItem("all_owned_NFTs", all_NFTs_list)
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
        chrome.notifications.create({
            type: 'basic',
            iconUrl: './icons/icon_128.png',
            title: `Solana - Error`,
            message: JSON.stringify(err),
            priority: 1
        })
        res("No NFTs Found")
    })
})
}

const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        console.log(reader.result)
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
        check_than_Insert_JS("contentScript.js", "google.css", tabId)
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
            check_than_Insert_JS("content.js", "NO_CSS", tabId)
        }

}}});

function check_than_Insert_JS(js_File_Name, css_File_Name, tabId){

let content_Message = "are_you_there_content_script?"

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
            files: ["./script/"+js_File_Name]
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
            files: ["./script/"+js_File_Name]
        });
    }
    else {//Already present content script - Send message to activate functions
        chrome.tabs.sendMessage(tabId, {message: "Changed Linkedin URL"}, (response) => {})
        console.log("already injected js => " + js_File_Name)
    }
});
}

chrome.runtime.onInstalled.addListener(async (details) => {
if(details.reason == "install"){
    // let today = new Date()
    // let sign_up = chrome.runtime.getURL("popup.html")
    // chrome.windows.create({url:sign_up})

    console.log("ONINSTALL STORAGE SET UP")
    await LS.setItem("all_favorites", [])
    await LS.setItem("free_membership", "ACTIVE")
    await LS.setItem("is_injected_capture_screen", false)
    await LS.setItem("premium_membership", "INACTIVE")
    await LS.setItem("free_member_since", today.toString())
}});