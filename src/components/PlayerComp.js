import React, { PropTypes, Component } from 'react';
import ProgressBar from './ProgressBarComp';
import Utils from '../logic/utils';
import './player.scss';

class PlayerComp extends Component {
    constructor(props) {
        super(props);
        this.videoPlayer = null;
        this.state = {
            isPlaying: false,
            lastSeeked: 0, // in percentage,
            progress: 0, // in percentage
            duration: 0 // in seconds
        };
    }

    // set timer
    componentDidMount() {
        this._startUpdatingProgress();
    }

    componentWillUpdate(nextProps) {
        // control play or pause
        if (this.videoPlayer && nextProps.isPlaying && !this.state.isPlaying) {
            this.state.isPlaying = true;
            this.videoPlayer.play();
        } else if (this.videoPlayer && !nextProps.isPlaying && this.props.isPlaying) {
            this.state.isPlaying = false;
            this.videoPlayer.pause();
        }

        // seek
        if (this.videoPlayer && this.props.toSeek !== this.state.lastSeeked) {
            const playedTime = Math.floor(this.state.duration * this.props.toSeek);
            this.videoPlayer.currentTime = playedTime;
            this.setState({
                lastSeeked: this.props.toSeek
            });
            this._updateProgressBar();
        }
    }

    _startUpdatingProgress() {
        this._updateProgressBar();
        setInterval(() => {
            this._updateProgressBar();
        }, 1000);
    }

    _updateProgressBar() {
        if (this.videoPlayer && this.state.isPlaying) {
            const duration = Math.floor(this.videoPlayer.duration);
            const playerTime = Math.floor(this.videoPlayer.currentTime);
            const progress = playerTime / duration;
            this.setState({progress, duration});
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <video
                    id="video"
                    className="player-video"
                    ref={(v) => { this.videoPlayer = v; }}
                    onClick={() => this.props.onProceed(!this.state.isPlaying)}>
                    {this.props.sources.map(src => <source key={src} src={src} />)}
                </video>

                {/* control bar */}
                <div className="row control-bar">
                    {/* play or pause */}
                    <div className="col-sm-1">
                        <span
                            className={`glyphicon glyphicon-${this.state.isPlaying ? 'pause' : 'play'}`}
                            aria-hidden="true"
                            onClick={() => this.props.onProceed(!this.state.isPlaying)}
                        />
                    </div>

                    {/* progress bar */}
                    <div className="col-sm-9">
                        <ProgressBar
                            progress={this.state.progress}
                            onSeek={percentage => this.props.onSeek(percentage)} />
                    </div>

                    {/* timer */}
                    <div className="col-sm-1">
                        <span className="timer">{Utils.secondsToTimeString(this.state.duration * this.state.progress)}</span>
                    </div>

                    {/* full screen */}
                    <div className="col-sm-1">
                        <span className="glyphicon glyphicon-fullscreen" onClick={() => this.videoPlayer.webkitRequestFullScreen()}/>
                    </div>
                </div>
            </div>
        );
    }
}

PlayerComp.propTypes = {
    className: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.string),
    isPlaying: PropTypes.bool,
    toSeek: PropTypes.number,
    onProceed: PropTypes.func,
    onSeek: PropTypes.func
};

PlayerComp.defaultProps = {
    isPlaying: false,
    toSeek: 0
};

export default PlayerComp;
