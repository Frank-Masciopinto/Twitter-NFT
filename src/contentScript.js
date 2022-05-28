console.log("TWITTER NFT --- Content.js is running!");
const web3 =  require("@solana/web3.js");

let solana_testnet = "https://api.testnet.solana.com"
let solana_mainet = "https://api.mainnet-beta.solana.com"
 
async function create_New_Solana_Wallet() {
  console.log("Creating Solana connection")
  // Connect to cluster
  const connection = new web3.Connection(
    solana_testnet,
    'confirmed',
  );
  const new_Solana_Address_Keypair = web3.Keypair.generate();
  console.log("HERE",new_Solana_Address_Keypair.publicKey.toBase58()) //PK in base58
}

//create_New_Solana_Wallet()


//Listening for Twitter Tab Update
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("LINE 23",request)
  if (request.message == "Changed Linkedin URL") {
    setInterval(() => {
      if (document.querySelector("title")){
        //console.log("TITT",document.querySelector("title").innerText)
        if(document.querySelector("title").innerText.match(/(?<=\(@).*(?=\))/)) {
          let visiting_username = document.querySelector("title").innerText.match(/(?<=\(@).*(?=\))/)[0]
          let your_own_username = document.querySelector('[aria-label="Account menu"]').innerText.match(/(?<=@).*/)[0]
          clearInterval()
          //console.log("NFT LOAD", document.querySelector('meta[content="profile"]'), visiting_username,your_own_username, (document.querySelector('meta[content="profile"]') && !document.querySelector("#my-nft-tab") && visiting_username == your_own_username));
          if (document.querySelector('meta[content="profile"]') && !document.querySelector("#my-nft-tab") && visiting_username == your_own_username) {//If Profile Page is open
            console.log("CREATING MY NFT TAB")  
            create_profile_NFT_tab()
            create_hex_image()
            replace_profile_tweets_image()
            }
        }        
      }


    }, 100);

      //show section
      if (document.querySelector('[aria-labelledby^="accessible-list"]')){
        console.log("HERE IN ACCESS", window.getComputedStyle(document.querySelector('[aria-labelledby^="accessible-list"]')).visibility);
        // remove all occurence of root div
        remove_wallet_button()

        document.querySelector('[aria-labelledby^="accessible-list"]').style.visibility = "visible";
        replace_profile_tweets_image();
      }
      // show likes/media no content div
      if (document.querySelector('[data-testid="emptyState"]')){
        console.log("HERE OF");
        // remove all occurence of root div
        remove_wallet_button()
        
        document.querySelector('[data-testid="emptyState"]').style.visibility = "visible";
        replace_profile_tweets_image();
      }

      if (document.querySelector('[data-testid="sidebarColumn"]') && !document.querySelector(".floor-price-main-tab")) {
        console.log("---INJECTING SCRIPT FOR FLOOR PRICE TAB---")
        //create container for NFTs price changes
        let main_div_floor_price = document.createElement("div")
        main_div_floor_price.className = "floor-price-main-tab";
        main_div_floor_price.style.background = document.body.style.backgroundColor; // set sidebar color as of body

        let you_might_like_right_col_div = document.querySelector('[aria-label="Who to follow"]')
        if (you_might_like_right_col_div){
          if (you_might_like_right_col_div.parentElement){
            you_might_like_right_col_div.parentElement.parentElement.prepend(main_div_floor_price)
          }          
        }

        create_NFTs_floor_price_tab(document.body.style.backgroundColor)
      }
      sendResponse({message: "response"})
  }
  else if (request.message == "are_you_there_content_script?") {
    sendResponse({status: "yes"})
  }
  else if(request.message == "home_hexa_image"){
    console.log("ON HOME")
    replace_happening_profile_image()
    sendResponse({});
  }
  else if (request.message == "reload_tweets_hexa"){
    console.log("HERE I AM", request)
    replace_profile_tweets_image(request.data)
    sendResponse({});
  }
})

window.addEventListener('load', (event) => {
  console.log("onLoad")
  setInterval(() => {
    if(document.querySelector("title")) {
      if(document.querySelector("title").innerText.match(/(?<=\(@).*(?=\))/)) {
        let visiting_username = document.querySelector("title").innerText.match(/(?<=\(@).*(?=\))/)[0]
        let your_own_username = document.querySelector('[aria-label="Account menu"]').innerText.match(/(?<=@).*/)[0]
        clearInterval()
        //console.log("NFT LOAD 2", document.querySelector('meta[content="profile"]'));
        if (document.querySelector('meta[content="profile"]') && !document.querySelector("#my-nft-tab") && visiting_username == your_own_username) {//If Profile Page is open
          console.log("CREATING MY NFT TAB ON LOAD")  
          create_profile_NFT_tab()
          create_hex_image()
          replace_profile_tweets_image()
          }
      }
    }
  }, 100);
});
//Creating new tab button for profile Tab Menu
function create_profile_NFT_tab() {
  console.log("Creating new tab My NFT")

  let nft_tab_container = document.createElement("div");
  let bgColor = document.body.style.backgroundColor;
  let nftTabTextColor = (bgColor == "rgb(255,%20255,%20255)")?"#536471":((bgColor == "rgb(0,%200,%200)")?"#8b98a5":"#71767b"); //#8b98a5 for dim, #71767b for lightout
  console.log("INITIAL CO",bgColor, nftTabTextColor)

  let extraClass = "r-14j79pv"; // for default
  if (bgColor == "rgb(0, 0, 0)") // for lighout
    extraClass = "r-1bwzh9t";
  else if(bgColor == "rgb(21, 32, 43)") // for dim
    extraClass = "r-115tad6";

  nft_tab_container.setAttribute("role", "presentation");
  nft_tab_container.id = "my-nft-tab"
  nft_tab_container.className += "css-1dbjc4n r-16y2uox r-6b64d0 r-cpa5s6";
  
  let link_to_nft_tab =  document.createElement("a");
  link_to_nft_tab.setAttribute("aria-selected", "false");
  link_to_nft_tab.setAttribute("role", "tab");
  link_to_nft_tab.className += "css-4rbku5 css-18t94o4 css-1dbjc4n r-1awozwy r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-1h3ijdo r-1777fci r-s8bhmr r-1ny4l3l r-1qhn6m8 r-i023vh r-o7ynqc r-6416eg";
  
  let inner_div = document.createElement("div")
  inner_div.setAttribute("dir", "auto");
  inner_div.className = "css-901oao r-1awozwy r-6koalj r-18u37iz r-37j5jr r-a023e6 r-b88u0q r-1pi2tsx r-1777fci r-rjixqe r-bcqeeo r-1l7z4oj r-95jzfe r-bnwqim r-qvutc0 " + extraClass;
  
  let span_title = document.createElement("span");
  span_title.className += "css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0";
  span_title.innerText = "Your NFTs";
  // change your nft tab color
  //console.log("LNE",window.getComputedStyle(span_title).color)
  if (!window.getComputedStyle(span_title).color)
    span_title.style.color = nftTabTextColor;
  
  let bottom_color = document.createElement("div");
  bottom_color.className = "css-1dbjc4n r-xoduu5";
  
  //Connecting them in the right sequence
  let profile_tabs_menu = document.querySelector('[role="tablist"]');
  //console.log(profile_tabs_menu)
  profile_tabs_menu.appendChild(nft_tab_container)
  nft_tab_container.appendChild(link_to_nft_tab)
  link_to_nft_tab.appendChild(inner_div)
  inner_div.appendChild(span_title)
  inner_div.appendChild(bottom_color)
  
  nft_tab_container.addEventListener("mouseover", function() {
    //Add mouse hover Twitter class effect
    link_to_nft_tab.className = "css-4rbku5 css-18t94o4 css-1dbjc4n r-1awozwy r-1ydqjzz r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-1h3ijdo r-1777fci r-s8bhmr r-1ny4l3l r-1qhn6m8 r-i023vh r-o7ynqc r-6416eg"
  })
  nft_tab_container.addEventListener("mouseout", function() {
    link_to_nft_tab.className = "css-4rbku5 css-18t94o4 css-1dbjc4n r-1awozwy r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-1h3ijdo r-1777fci r-s8bhmr r-1ny4l3l r-1qhn6m8 r-i023vh r-o7ynqc r-6416eg";
  })

  nft_tab_container.addEventListener("click", function(e) {
    
    // hide section
    if ( document.querySelector('[aria-labelledby^="accessible-list"]') )
      document.querySelector('[aria-labelledby^="accessible-list"]').style.visibility = "hidden";
    
    // for media/like tab
    let mediaTabEle = document.querySelector('[data-testid="emptyState"]');
    if ( mediaTabEle ){
      //console.log("I AM HERE", window.getComputedStyle(mediaTabEle).visibility)
      document.querySelector('[data-testid="emptyState"]').style.visibility = "hidden";
    }
    
    // change your nft tab color after selection
    let selectedTabEle = document.getElementById("my-nft-tab").children[0].children[0].children[0];
    if (selectedTabEle){
      let oldTabColor = selectedTabEle.style.color;
      if (oldTabColor){
        let newTabTextColor = (oldTabColor == "rgb(113, 118, 123)")?(bgColor == "rgb(255, 255, 255)")?(oldTabColor == "rgb(231, 233, 234)")?"#0f1419":"#0f1419":"#f7f9f9":((oldTabColor == "rgb(113, 118, 123)")?"#0f1419":"#e7e9ea"); //#f7f9f9 for dim, #e7e9ea for lightout
        selectedTabEle.style.color = newTabTextColor;
      }
    }

    let all_tabs = profile_tabs_menu.querySelectorAll('a')
    for (let i = 0; i<all_tabs.length; i++) {
      if (all_tabs[i].querySelector('.r-1p0dtai')) {//If was previously clicked, remove blue underline and bold text
        console.log("Changing className other profile menu items")
        //remove bold text

        if (all_tabs[i].querySelector("span").innerText != "Your NFTs"){
          all_tabs[i].querySelector('.r-1p0dtai').parentElement.className = "css-901oao r-1awozwy r-6koalj r-18u37iz r-37j5jr r-a023e6 r-majxgm r-1pi2tsx r-1777fci r-rjixqe r-bcqeeo r-1l7z4oj r-95jzfe r-bnwqim r-qvutc0 " + extraClass ;
        
          //remove blue underline
          all_tabs[i].querySelector('.r-1p0dtai').className = "css-1dbjc4n r-xoduu5";          
        }
      }
    }
    bottom_color.className = "css-1dbjc4n r-1kihuf0 r-l5o3uw r-sdzlij r-1p0dtai r-xoduu5 r-hdaws3 r-s8bhmr r-u8s1d r-13qz1uu";

    // remove all occurence of root div
    remove_wallet_button()
    // add new root element
    let root_div = document.createElement("div")
    root_div.id = "root";

    var profile_menu = document.querySelector('[aria-label="Profile timelines"]');
    profile_menu.insertAdjacentElement("afterend", root_div);

    var script = document.createElement('script');
    script.src = chrome.runtime.getURL('./display_nft_Gallery.js');
    document.head.appendChild(script)
    //chrome.runtime.sendMessage({message: "connect wallet"})
  })
}

/* function to create hexagonal image on profile page & placing it over original one */
function create_hex_image() {
  var headerImageSlug = document.URL?"/" +document.URL.split("/")[3] + "/header_photo":undefined;
  if (headerImageSlug != undefined){
      var headerImageEle = document.querySelector('[href="'+headerImageSlug+'"]');
      if (headerImageEle){
        var profileImageParentEle = headerImageEle.nextElementSibling.querySelector("div > div");
        var profileImageEle = profileImageParentEle.querySelector("div");
        profileImageParentEle.style.zIndex = 111;
        if (profileImageEle){
          // hide existing image
          profileImageEle.style.display = "none";
          // append new element
          let hexImageEleContainer = document.createElement("div");
          hexImageEleContainer.className = "twitter-hex-container";
          profileImageParentEle.prepend(hexImageEleContainer);

          appendHexagonalImage()
        }
      }else{
        var blankProfileImageEle = document.getElementsByClassName('css-1dbjc4n r-1ifxtd0 ')[0];
        var profileImageParentEle = blankProfileImageEle.querySelector("div > div");
        var profileImageEle = profileImageParentEle.querySelector("div");
        profileImageParentEle.style.zIndex = 111;
        // hide existing image
        profileImageEle.style.display = "none";
        // append new element
        let hexImageEleContainer = document.createElement("div");
        hexImageEleContainer.className = "twitter-hex-container";
        profileImageParentEle.prepend(hexImageEleContainer);

        appendHexagonalImage()
      }
    }
}

/* function to replace public tweets profile image coming under tweets tab on profile page*/
function replace_profile_tweets_image(base64="") {
  var profileImageSlug = document.querySelector('meta[property="og:image"]')?document.querySelector('meta[property="og:image"]').getAttribute('content'):undefined;
  console.log("PIS", profileImageSlug);
  if (profileImageSlug){
    var tweetInterval = setInterval(() => {
      if (base64.length == 0){
        var allPublicImageEle = document.querySelectorAll('[src="'+profileImageSlug+'"]');
        if (allPublicImageEle.length == 0){
          profileImageSlug = profileImageSlug.replace("normal","bigger");
          allPublicImageEle = document.querySelectorAll('[src="'+profileImageSlug+'"]');
        }
      }
      else
        var allPublicImageEle = document.querySelectorAll(".twitter-profile-hex-container");

      for (let i = 0; i<allPublicImageEle.length; i++) {
        var uniqueId= (Math.random() + 1).toString(36).substring(7);
        // append new element
        let hexImageEleContainer = document.createElement("div");
        hexImageEleContainer.classList.add(...["twitter-profile-hex-container", "twitter-profile-hex-container_"+ uniqueId]);
        
        if (base64.length == 0){
          let publicParentElement = allPublicImageEle[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
          // hide existing image
          publicParentElement.parentElement.style.display = "none";          
          publicParentElement.parentElement.parentElement.prepend(hexImageEleContainer);
          allPublicImageEle[i].remove();
          appendHexagonalTweetImage(uniqueId);
        }else{
          allPublicImageEle[i].querySelector("svg").children[0].children[0].children[2].children[0].setAttribute("src", base64)
          allPublicImageEle[i].querySelector("svg").children[0].children[0].children[2].children[0].setAttribute("xlink:href", base64)
        }
      }

      if (base64.length == 0){
        if (allPublicImageEle.length == 0)
          clearInterval(tweetInterval);
      }else{
        clearInterval(tweetInterval);
      }
    }, 100);
  }
}

/* function to replace profile image on home page near "what's happening textarea" */
function replace_happening_profile_image(base64="") {
  var profileImageSlug = "";
  for(let i=0; i< document.scripts.length; i++){
    var text = document.scripts[i].innerHTML;
    if(text.includes("window.__INITIAL_STATE__")){
      let rawText = text.split("window.__INITIAL_STATE__=")[1];
      if (rawText.includes(";window.__META_DATA__"))
        rawText = rawText.split(";window.__META_DATA__")[0];

      let rawJson = JSON.parse(rawText);
      let userEntity = rawJson.entities.users.entities;
      if (userEntity){
        let key = Object.keys(userEntity);
        if (key.length){
          key = key[0];
          if (userEntity[key])
            profileImageSlug = userEntity[key].profile_image_url_https;
        }
      }
    }
  }

  if (profileImageSlug){
    var tweetInterval = setInterval(() => {
      if (base64.length == 0){
        var allPublicImageEle = document.querySelectorAll('[src="'+profileImageSlug+'"]');
        if (allPublicImageEle.length == 0){
          profileImageSlug = profileImageSlug.replace("normal","bigger");
          allPublicImageEle = document.querySelectorAll('[src="'+profileImageSlug+'"]');
        }
      }
      else
        var allPublicImageEle = document.querySelectorAll(".twitter-profile-hex-container");

      for (let i = 0; i<allPublicImageEle.length; i++) {
        var uniqueId= (Math.random() + 1).toString(36).substring(7);
        // append new element
        let hexImageEleContainer = document.createElement("div");
        hexImageEleContainer.classList.add(...["twitter-profile-hex-container", "twitter-profile-hex-container_"+ uniqueId]);
        
        if (base64.length == 0){
          let publicParentElement = allPublicImageEle[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
          // hide existing image
          publicParentElement.parentElement.style.display = "none";          
          publicParentElement.parentElement.parentElement.prepend(hexImageEleContainer);
          allPublicImageEle[i].remove();
          appendHexagonalTweetImage(uniqueId);
        }else
          allPublicImageEle[i].children[1].setAttribute("src", base64);   
      }

      if (base64.length == 0){
        if (allPublicImageEle.length == 0)
          clearInterval(tweetInterval);
      }else{
        clearInterval(tweetInterval);
      }
    }, 1000);
  }
}

function remove_wallet_button(selector="#root"){
  if (document.querySelectorAll(selector)){
    document.querySelectorAll(selector).forEach(e => e.remove());
  }
  let selectedTabEle = document.getElementById("my-nft-tab");
  /*if (selectedTabEle){
    // remove on second click
    console.log("HERE IN RE<OVE",selectedTabEle)
    selectedTabEle.children[0].children[0].children[0].className = "css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0";
    selectedTabEle.children[0].children[0].children[0].style.color = "";
    // remove underline
    console.log("HERE IN RE",selectedTabEle.children[0].children[0])
    selectedTabEle.children[0].children[0].children[1].className = "css-1dbjc4n r-xoduu5";
    
  }*/
}

function create_NFTs_floor_price_tab(bodyBgColor) {
  var script = document.createElement('script');
  script.className = "display_nft_floor_price_js";
  script.src = chrome.runtime.getURL('./display_nft_floor_price.js?color='+bodyBgColor);
  document.head.appendChild(script)
}

function appendHexagonalImage() {
  var script = document.createElement('script');
  script.className = "hexagonal_image";
  script.src = chrome.runtime.getURL('./append_hex_image.js');
  document.head.appendChild(script);
}

function appendHexagonalTweetImage(id="897987") {
  var script = document.createElement('script');
  script.className = "hexagonal_public_image_"+id;
  script.src = chrome.runtime.getURL('./append_hex_tweet_image.js?id='+id);
  document.head.appendChild(script);
}