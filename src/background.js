const LS = {
  getAllItems: () => chrome.storage.local.get(),
  getItem: async key => (await chrome.storage.local.get(key))[key],
  setItem: (key, val) => chrome.storage.local.set({[key]: val}),
  removeItems: keys => chrome.storage.local.remove(keys),
};

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
        check_than_Insert_JS("content.js", "google.css", tabId)
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
        chrome.tabs.sendMessage(tabId, {message: "Changed Linkedin URL"})
        console.log("already injected js => " + js_File_Name)
      }
  });
}

chrome.runtime.onInstalled.addListener(async (details) => {
  if(details.reason == "install"){
      let today = new Date()
      let sign_up = chrome.runtime.getURL("sign-up.html")
      chrome.windows.create({url:sign_up})

      console.log("ONINSTALL STORAGE SET UP")
      await LS.setItem("all_favorites", [])
      await LS.setItem("free_membership", "ACTIVE")
      await LS.setItem("is_injected_capture_screen", false)
      await LS.setItem("premium_membership", "INACTIVE")
      await LS.setItem("free_member_since", today.toString())
}});
let sign_up = chrome.runtime.getURL("sign-up.html")
chrome.windows.create({url:sign_up})