import React, { PropTypes, Component } from 'react';
import ProgressBar from './ProgressBarComp'
import './player.scss';

class PlayerComp extends Component {
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

    _fullScreen() {
        this.videoPlayer.webkitRequestFullScreen();
    }

    _seek(percentage) { // eslint-disable-line
        console.log(percentage); // eslint-disable-line
    }

    render() {
        return (
            <div className={this.props.className}>
                <video
                    id="video"
                    className="player-video"
                    ref={(v) => { this.videoPlayer = v; }}>
                    {this.props.sources.map(src => <source key={src} src={src} />)}
                </video>
                <div className="row control-bar">
                    <span
                        className={`col-sm-1 glyphicon glyphicon-${this.state.isPlaying ? 'pause' : 'play'}`}
                        aria-hidden="true"
                        onClick={() => this.props.onProceed(!this.state.isPlaying)}
                    />
                    <span>
                        <ProgressBar
                            className="col-sm-10"
                            min={0}
                            max={100}
                            interval={1}
                            onClick={i => this._seek(i / 100)} />
                    </span>
                    <span className="col-sm-1 glyphicon glyphicon-fullscreen" onClick={() => this._fullScreen()}/>
                </div>
            </div>
        );
    }
}

PlayerComp.propTypes = {
    className: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.string),
    onProceed: PropTypes.func,
    isPlaying: PropTypes.bool
};

PlayerComp.defaultProps = {
    isPlaying: false
};

export default PlayerComp;
