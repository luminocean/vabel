import React from 'react';
import Player from '../containers/Player';
import './App.css';

class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <Player />
            </div>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
