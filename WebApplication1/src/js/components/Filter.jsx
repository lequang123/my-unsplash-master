import React, { Component } from 'react';
import Logo from '../../../src/image/my_unsplash_logo.png';
import AddImage from './AddImage.jsx';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    handleShowModal = () => {
        this.setState({showModal: true});
    }

    handleCloseModal = () => {
        this.setState({showModal: false});
    }

    handleSubmit = (label, url) => {
        console.log(label, url);
    }

    render() {
        return (
            <div className="filter">
                <div className="left float-left">
                    <img className="logo" src={Logo} alt="Logo" />
                    <span className="material-icons">search</span>
                    <input  className ="search" type="text" placeholder = "Search by name" />
                </div>
               <div className="float-right">
                    <button className="btn-add" onClick={this.handleShowModal}>Add a photo</button>
               </div>
               <AddImage 
                    showModal={this.state.showModal}
                    handleCloseModal={this.handleCloseModal}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}
export default  Filter;