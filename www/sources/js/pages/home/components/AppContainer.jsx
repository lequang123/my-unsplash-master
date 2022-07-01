import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Filter />
                <DataGrid />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams
    } = state;
    return {
        gridParams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
