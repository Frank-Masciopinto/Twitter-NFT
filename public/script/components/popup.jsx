import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class Wallet_ui extends Component {

    state = {
        count: 1,
        imageUrl: 'https://picsum.photos/200'
    }
    styles = {
        fontSize: 30,
        fontWeight: "bold"
    }

    render() { 
        return (<div>
                <link rel="stylesheet" href="css/wallet.css" />
                <img src={this.state.imageUrl} alt="" />
                <FontAwesomeIcon icon={faCoffee} />
                <i className='fa-solid fa-alarm-exclamation'></i>
                <h1 style={this.styles} className="badge badge-primary">{this.formatcount()}</h1>
                <button>Create New Wallet</button>
                </div>);
    }

    formatcount() {
        const { count } = this.state;
        return count === 0 ? 'zero' : count
    }

}
 
export default Wallet_ui;