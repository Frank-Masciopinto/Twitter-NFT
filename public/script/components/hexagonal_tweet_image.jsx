/*global chrome*/
import React, { Component } from 'react';
import * as ReactDOMClient from 'react-dom/client';

let CE_id= "mgikgljaihkbncapdiejigpdfdaegfca"; 

class HexagonalImage extends Component {
	constructor(){
        super()
        
        this.state = { 
          publicKey: localStorage.getItem("wallet_public_key")?localStorage.getItem("wallet_public_key"):sessionStorage.getItem("wallet_public_key"),
          port: chrome.runtime.connect(CE_id),
          nft_list: [],
          isToggleOn:false,
          hexaImage:this.convertUrlToBase64(sessionStorage.getItem('hexa_profile_image'), chrome.runtime.connect(CE_id)),
					loading:true
				}
        this.toggleModal = this.handleToggle.bind(this);
    }

    handleToggle(){
    	this.setState(prevState => ({
    		isToggleOn:!prevState.isToggleOn
    	}));
    }

    async convertUrlToBase64(url, port=undefined){
    	var port = port?port:this.state.port;
    	if ((url == undefined) || (url == null))
    		url = localStorage.getItem("hexa_profile_image")?localStorage.getItem("hexa_profile_image"):"https://picsum.photos/200";
			port.postMessage({message: "hexagon_get_base64", publicKey: url})
			port.onMessage.addListener((msg) => {
			  if (msg.message == "base64_response")
			  	this.setState({
            hexaImage: msg.data,
            loading:false
        	});
			});
    }

	render(){
		const { loading } = this.state;
 		return (
			<>
			<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 145.9 137.7" enableBackground="new 0 0 145.9 137.7" style={{ height: '100%', width: '100%' }}>
				<g>
					<g>
						<defs>
							<path id="SVGID_1_" d="M136.2,53.4l-18.3-33C112.3,10.3,101.6,4,90,4H56c-11.6,0-22.3,6.3-27.9,16.5l-18.3,33
								c-5.3,9.6-5.3,21.2,0,30.8l18.3,33c5.6,10.1,16.3,16.4,27.9,16.4h33.9c11.6,0,22.3-6.3,27.9-16.4l18.3-33
								C141.4,74.6,141.4,63.1,136.2,53.4z"/>
						</defs>
						<clipPath id="SVGID_00000000194842768478956780000016010526301968842905_">
							<use xlinkHref="#SVGID_1_" className="svg_overflow"/>
						</clipPath>
						
							<g transform="matrix(1 0 0 1 1.907349e-06 0)" style={{ clipPath: "url('#SVGID_00000000194842768478956780000016010526301968842905_')" }}>
								<image className="svg_overflow" width="540" height="360" xlinkHref={this.state.hexaImage}  transform="matrix(0.3726 0 0 0.3726 -27.6392 1.7906)" />
						</g>
					</g>
					<path fill="#FFFFFF" d="M139.6,51.5l-18.3-33C115,7.1,103,0,90,0H56C43,0,30.9,7.1,24.6,18.5l-18.3,33c-6,10.9-6,23.8,0,34.7l18.3,33
						c6.3,11.4,18.3,18.5,31.4,18.5h34c13,0,25.1-7.1,31.4-18.5l18.3-33C145.6,75.4,145.6,62.4,139.6,51.5z M136.1,84.3l-18.3,33
						c-5.6,10.1-16.3,16.4-27.9,16.4H56c-11.6,0-22.3-6.3-27.9-16.4l-18.3-33c-5.3-9.6-5.3-21.2,0-30.8l18.3-33C33.7,10.3,44.4,4,56,4
						h34c11.6,0,22.3,6.3,27.9,16.4l18.3,33C141.4,63.1,141.4,74.6,136.1,84.3z"/>
					<g>
						<path fill="#7A2082" d="M90,8c10.1,0,19.5,5.5,24.4,14.3l18.3,33c4.6,8.5,4.5,18.6-0.1,27l-18.3,33c-4.9,8.8-14.3,14.3-24.4,14.3H56
							c-10.1,0-19.5-5.5-24.4-14.3l-18.3-33c-4.7-8.4-4.7-18.5,0-26.9l18.3-33C36.5,13.5,45.8,8,56,8H90 M90,4H56
							c-11.6,0-22.3,6.3-27.9,16.5l-18.3,33c-5.3,9.6-5.3,21.2,0,30.8l18.3,33c5.6,10.1,16.3,16.4,27.9,16.4h33.9
							c11.6,0,22.3-6.3,27.9-16.4l18.3-33c5.3-9.7,5.3-21.2,0.1-30.9l-18.3-33C112.3,10.3,101.6,4,90,4L90,4z"/>
					</g>
				</g>
			</svg>
			{this.state.loading?
				(<div className="loader tweet_loader"></div>):
				null
			}
			</>
		)		
	}
};

export default HexagonalImage;