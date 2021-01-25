import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer.jsx';
import "../style/index.scss";
class Welcome extends React.Component {
    render() {
        return (
            <AppContainer />
        )
    }
}
ReactDOM.render(<Welcome />, document.getElementById("root"));