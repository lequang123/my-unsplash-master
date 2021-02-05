import React, { Component, Fragment } from 'react';
import Filter from './Filter.jsx';
import Image from './Image.jsx';

export default class AppContainer extends Component {
    render() {
        return (
            <Fragment>
                <Filter />
                <Image />
            </Fragment>
        )
    }
}
