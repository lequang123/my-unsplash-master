import React, { Component } from 'react';
import Logo from '../../../src/image/image.png';

class Image extends Component {
    render() {
        return (
             <img src={Logo} alt="Logo" />
        );
    }
}

export default Image;