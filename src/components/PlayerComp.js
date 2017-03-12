import React, { PropTypes, Component } from 'react';
import ProgressBar from './ProgressBarComp';
import Utils from '../logic/utils';
import './player.scss';

class PlayerComp extends Component {
    constructor(props) {
        super(props);
        this.videoPlayer = null;
        this.videoDuration = 0; // in seconds
        this.state = {
            isPlaying: false,
            lastSeeked: 0, // in percentage
            progress: 0, // in percentage
        };
    }

    componentDidMount() {
        // set timer
        this._updateProgressBar();
        setInterval(() => {
            this._updateProgressBar();
        }, 1000);
    }

    componentWillUpdate(nextProps) {
        // do playing or pausing
        if (this.videoPlayer && nextProps.isPlaying && !this.state.isPlaying) {
            this.state.isPlaying = true;
            this.videoPlayer.play();
        } else if (this.videoPlayer && !nextProps.isPlaying && this.props.isPlaying) {
            this.state.isPlaying = false;
            this.videoPlayer.pause();
        }

        // do seeking
        if (this.videoPlayer && this.props.toSeek !== this.state.lastSeeked) {
            const playedTime = Math.floor(this.videoDuration * this.props.toSeek);
            this.videoPlayer.currentTime = playedTime;
            this.setState({
                lastSeeked: this.props.toSeek
            });
            this._updateProgressBar();
        }
    }

    set player(videoElemement) {
        const ele = videoElemement;
        ele.ondurationchange = () => {
            this.videoPlayer = videoElemement;
            this.videoDuration = videoElemement.duration;
        };
    }

    // make state updated with current video progress
    // so that progress bar can also be updated
    _updateProgressBar() {
        if (this.videoPlayer && this.state.isPlaying) {
            const playedTime = Math.floor(this.videoPlayer.currentTime);
            this.setState({
                progress: playedTime / this.videoDuration
            });
        }
    }

    render() {
        return (
            <div>
                <video
                    id="video"
                    className="player-video"
                    ref={(v) => { if (v) this.player = v; }}
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
                        <span className="timer">{Utils.secondsToTimeString(this.videoDuration * this.state.progress)}</span>
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
