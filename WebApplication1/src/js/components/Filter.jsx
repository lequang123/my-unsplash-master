import React, { Component } from 'react';
import Logo from '../../../src/image/my_unsplash_logo.png';
import {Button} from 'react-bootstrap';

class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="left float-left">
                    <img className="logo" src={Logo} alt="Logo" />
                    <span className="material-icons">search</span>
                    <input  type="text" placeholder = "Search by name" />
                </div>
               <div className="float-right">
                    <button>Add a photo</button>
               </div>
            </div>
        );
    }
}

export default Filter;