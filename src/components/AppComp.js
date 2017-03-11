import React from 'react';
import Player from '../containers/Player';
import './app.css';

class AppComp extends React.Component {
    render() {
        return (
            <div className="row">
                <Player className="col-sm-6"/>
            </div>
        );
    }
}

AppComp.defaultProps = {};
export default AppComp;
