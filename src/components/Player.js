import React, { PropTypes, Component } from 'react';
import './Player.scss';

class PlayerComponent extends Component {
    constructor(props) {
        super(props);
        this.videoPlayer = null;
    }

    render() {
        return (
            <div className={this.props.className}>
                <video className="player-video" ref={(v) => { this.videoPlayer = v; }}>
                    {this.props.sources.map(src => <source key={src} src={src} />)}
                </video>
                <div className="control-bar">
                    <span
                        className="glyphicon glyphicon-play"
                        aria-hidden="true"
                        onClick={() => this.props.onPlay()}
                    />
                </div>
            </div>
        );
    }
}

PlayerComponent.propTypes = {
    className: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.string),
    onPlay: PropTypes.func
};

export default PlayerComponent;
