import React, { PropTypes, Component } from 'react';
import ProgressBar from './ProgressBarComp';
import './player.scss';

class PlayerComp extends Component {
    constructor(props) {
        super(props);
        this.videoPlayer = null;
        this.state = {
            isPlaying: false,
            lastSeeked: 0
        };
    }

    shouldComponentUpdate(nextProps) {
        // if prop playing state is not the same is state playing state, then update
        return !nextProps.isPlaying !== !this.state.isPlaying
            || nextProps.progress !== this.state.lastSeeked;
    }

    componentWillUpdate(nextProps) {
        // update control icon appearance
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

        if (this.props.progress !== this.state.lastSeeked) {
            const duration = this.videoPlayer.duration;
            this.videoPlayer.currentTime = Math.floor(duration * this.props.progress);
            this.state.lastSeeked = this.props.progress;
        }
    }

    _fullScreen() {
        this.videoPlayer.webkitRequestFullScreen();
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
                            onClick={i => this.props.onSeek(i / 100)} />
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
    isPlaying: PropTypes.bool,
    progress: PropTypes.number,
    onProceed: PropTypes.func,
    onSeek: PropTypes.func
};

PlayerComp.defaultProps = {
    isPlaying: false,
    progress: 0
};

export default PlayerComp;
