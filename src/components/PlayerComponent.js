import React, { PropTypes, Component } from 'react';
import './PlayerComponent.scss';

class PlayerComponent extends Component {
    constructor(props) {
        super(props);
        this.videoPlayer = null;
        this.state = {
            isPlaying: false
        };
    }

    shouldComponentUpdate(nextProps) {
        // if prop playing state is not the same is state playing state, then update
        return !nextProps.isPlaying !== !this.state.isPlaying;
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isPlaying && !this.state.isPlaying) {
            this.state.isPlaying = true;
            this.videoPlayer.toPlay = true;
        } else if (!nextProps.isPlaying && this.props.isPlaying) {
            this.state.isPlaying = false;
            this.videoPlayer.toPause = true;
        }
    }

    componentDidUpdate() {
        if (this.videoPlayer.toPlay) {
            this.videoPlayer.play();
            this.videoPlayer.toPlay = false;
        } else if (this.videoPlayer.toPause) {
            this.videoPlayer.pause();
            this.videoPlayer.toPause = false;
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <video
                    className="player-video"
                    ref={(v) => { this.videoPlayer = v; }}>
                    {this.props.sources.map(src => <source key={src} src={src} />)}
                </video>
                <div className="control-bar">
                    <span
                        className={`glyphicon glyphicon-${this.state.isPlaying ? 'pause' : 'play'}`}
                        aria-hidden="true"
                        onClick={() => this.props.onProceed(!this.state.isPlaying)}
                    />
                </div>
            </div>
        );
    }
}

PlayerComponent.propTypes = {
    className: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.string),
    onProceed: PropTypes.func,
    isPlaying: PropTypes.bool
};

PlayerComponent.defaultProps = {
    isPlaying: false
};

export default PlayerComponent;
