import React from 'react';
import Player from '../containers/Player';
import './app.css';

class AppComp extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <Player />
                    </div>
                </div>
            </div>
        );
    }
}

AppComp.defaultProps = {};
export default AppComp;
