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
  console.log(new_Solana_Address_Keypair.publicKey.toBase58()) //PK in base58
}

//create_New_Solana_Wallet()


//Listening for Twitter Tab Update
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log(request)
  if (request.message == "Changed Linkedin URL") {
    setInterval(() => {
      if(document.querySelector("title").innerText.match(/(?<=\(@).*(?=\))/)) {
        let visiting_username = document.querySelector("title").innerText.match(/(?<=\(@).*(?=\))/)[0]
        let your_own_username = document.querySelector('[aria-label="Account menu"]').innerText.match(/(?<=@).*/)[0]
        clearInterval()
        if (document.querySelector('meta[content="profile"]') && !document.querySelector("#my-nft-tab") && visiting_username == your_own_username) {//If Profile Page is open
          console.log("CREATING MY NFT TAB")  
          create_profile_NFT_tab()
          create_Hexagon_NFT_Profile_Picture()
          }
      }
    }, 100);
      if (document.querySelector('[data-testid="sidebarColumn"]') && !document.querySelector(".floor-price-main-tab")) {
        console.log("---INJECTING SCRIPT FOR FLOOR PRICE TAB---")
        //create container for NFTs price changes
        let main_div_floor_price = document.createElement("div")
        main_div_floor_price.className = "floor-price-main-tab"

        let you_might_like_right_col_div = document.querySelector('[aria-label="Who to follow"]')
        you_might_like_right_col_div.parentElement.parentElement.prepend(main_div_floor_price)

        create_NFTs_floor_price_tab()
      }
      sendResponse({message: "response"})
  }
  else if (request.message == "are_you_there_content_script?") {
    sendResponse({status: "yes"})
  }
})

window.addEventListener('load', (event) => {
  console.log("onLoad")
  setInterval(() => {
    if(document.querySelector("title").innerText.match(/(?<=\(@).*(?=\))/)) {
      let visiting_username = document.querySelector("title").innerText.match(/(?<=\(@).*(?=\))/)[0]
      let your_own_username = document.querySelector('[aria-label="Account menu"]').innerText.match(/(?<=@).*/)[0]
      clearInterval()
      if (document.querySelector('meta[content="profile"]') && !document.querySelector("#my-nft-tab") && visiting_username == your_own_username) {//If Profile Page is open
        console.log("CREATING MY NFT TAB")  
        create_profile_NFT_tab()
        create_Hexagon_NFT_Profile_Picture()
        }
    }
  }, 100);
});

function create_Hexagon_NFT_Profile_Picture() {
  console.log("create_Hexagon_NFT_Profile_Picture()")
  let profile_pic_container = document.querySelector('a[href="/settings/profile"]').parentElement.parentElement
  let new_profile_pic = document.createElement("div")
  new_profile_pic.className = "new_profile_pic_container"
  profile_pic_container.appendChild(new_profile_pic)
  var script = document.createElement('script');
  script.className = "hex_profile_pic_js"
  script.src = chrome.runtime.getURL('./hex_profile_pic.js');
  document.head.appendChild(script)
  

}

//Creating new tab button for profile Tab Menu
function create_profile_NFT_tab() {
  console.log("Creating new tab My NFT")
  let nft_tab_container = document.createElement("div");
  nft_tab_container.setAttribute("role", "presentation");
  nft_tab_container.id = "my-nft-tab"
  nft_tab_container.className += "css-1dbjc4n r-16y2uox r-6b64d0 r-cpa5s6";
  
  let link_to_nft_tab =  document.createElement("a");
  link_to_nft_tab.setAttribute("aria-selected", "false");
  link_to_nft_tab.setAttribute("role", "tab");
  link_to_nft_tab.className += "css-4rbku5 css-18t94o4 css-1dbjc4n r-1awozwy r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-1h3ijdo r-1777fci r-s8bhmr r-1ny4l3l r-1qhn6m8 r-i023vh r-o7ynqc r-6416eg";
  
  let inner_div = document.createElement("div")
  inner_div.setAttribute("dir", "auto");
  inner_div.className += "css-901oao r-1awozwy r-18jsvk2 r-6koalj r-18u37iz r-37j5jr r-a023e6 r-b88u0q r-1pi2tsx r-1777fci r-rjixqe r-bcqeeo r-1l7z4oj r-95jzfe r-bnwqim r-qvutc0";
  
  let span_title = document.createElement("span");
  span_title.className += "css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0";
  span_title.innerText = "Your NFTs";
  
  let bottom_color = document.createElement("div");
  bottom_color.className = "css-1dbjc4n r-xoduu5";
  
  //Connecting them in the right sequence
  let profile_tabs_menu = document.querySelector('[role="tablist"]');
  console.log(profile_tabs_menu)
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
  nft_tab_container.addEventListener("click", function() {
    let all_tabs = profile_tabs_menu.querySelectorAll('a')
    for (let i = 0; i<all_tabs.length; i++) {
      if (all_tabs[i].querySelector('.r-1p0dtai')) {//If was previously clicked, remove blue underline and bold text
        console.log("Changing className other profile menu items")
        console.log(all_tabs[i].querySelector('.r-1p0dtai'))
        //remove bold text
        all_tabs[i].querySelector('.r-1p0dtai').parentElement.className = "css-901oao r-1awozwy r-14j79pv r-6koalj r-18u37iz r-37j5jr r-a023e6 r-majxgm r-1pi2tsx r-1777fci r-rjixqe r-bcqeeo r-1l7z4oj r-95jzfe r-bnwqim r-qvutc0"
        //remove blue underline
        all_tabs[i].querySelector('.r-1p0dtai').className = "css-1dbjc4n r-xoduu5"
      }
    }
    bottom_color.className = "css-1dbjc4n r-1kihuf0 r-l5o3uw r-sdzlij r-1p0dtai r-xoduu5 r-hdaws3 r-s8bhmr r-u8s1d r-13qz1uu";

    //hide feed
    try {
      document.querySelector('[aria-labelledby^="accessible-list"]').style.visibility = "hidden"
    }
    catch {
      document.querySelector('[data-testid="emptyState"]').style.visibility = "hidden"
    }
    var profile_menu = document.querySelector('[aria-label="Profile timelines"]');
    let root_div = document.createElement("div")
    root_div.id = "root"
    root_div.innerHTML = "IM HERE"
    profile_menu.insertAdjacentElement("afterend", root_div);
    var script = document.createElement('script');
    script.src = chrome.runtime.getURL('./display_nft_Gallery.js');
    document.head.appendChild(script)
    //chrome.runtime.sendMessage({message: "connect wallet"})
  })
}

function create_NFTs_floor_price_tab() {
  var script = document.createElement('script');
  script.className = "display_nft_floor_price_js"
  script.src = chrome.runtime.getURL('./display_nft_floor_price.js');
  document.head.appendChild(script)
}