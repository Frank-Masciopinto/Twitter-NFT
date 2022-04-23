import React, { Component } from 'react';
class Wallet_ui extends Component {

    state = {
        count: 1,
        imageUrl: 'https://picsum.photos/200'
    }

    render() { 
        return (<div>
                <img src={this.state.imageUrl} alt="" />
                <h1 className="badge badge-primary">{this.formatcount()}</h1>
                <button>Create New Wallet</button>
                </div>);
    }

    formatcount() {
        const { count } = this.state;
        return count === 0 ? 'zero' : count
    }

}
 
export default Wallet_ui;