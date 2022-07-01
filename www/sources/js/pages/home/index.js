import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@jsroot/components/Layout';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeSlice';
import AppContainer from './components/AppContainer.jsx';

const store = configureStore({
    reducer: homeReducer
});

ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <AppContainer />
        </Layout>
    </Provider>,
    document.getElementById('app-container'));