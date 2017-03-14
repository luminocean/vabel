import React from 'react';
import Player from '../containers/Player';
import Crop from '../containers/Crop';
import Record from '../containers/Record';
import './app.css';

class AppComp extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <Player/>
                    </div>
                    <div className="col-sm-4">
                        <Record/>
                    </div>
                </div>
                <Crop/>
            </div>
        );
    }
}

AppComp.defaultProps = {};
export default AppComp;
