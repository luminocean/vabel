import React, { PropTypes, Component } from 'react';
import ProgressBar from './ProgressBarComp';
import Utils from '../logic/utils';
import './player.scss';

class PlayerComp extends Component {
    constructor(props) {
        super(props);
        this.videoPlayer = null;
        this.videoDuration = 0; // in seconds
        this.leapPercentage = 0.01;

        this.state = {
            playing: false,
            lastSeeked: 0, // in percentage
            progress: 0, // in percentage
            toSeek: null
        };
        // export delegate
        if (props.delegate) props.delegate(this.delegate);
    }

    componentDidMount() {
        // set timer
        this._updateProgressBar();
        setInterval(() => {
            this._updateProgressBar();
        }, 300);
    }

    componentWillReceiveProps(nextProps) {
        // do playing or pausing
        if (this.videoPlayer && nextProps.playing && !this.state.playing) {
            this.state.playing = true;
            this.videoPlayer.play();
        } else if (this.videoPlayer && !nextProps.playing && this.props.playing) {
            this.state.playing = false;
            this.videoPlayer.pause();
        }
    }

    set player(videoElemement) {
        const ele = videoElemement;
        if (!ele) return; // videoElemement might be undefined

        ele.ondurationchange = () => {
            this.videoPlayer = videoElemement;
            this.videoDuration = videoElemement.duration;
        };
    }

    get delegate() {
        const seek = (percentage) => {
            if (!this.videoPlayer) return;
            this.videoPlayer.currentTime = Math.floor(this.videoDuration * percentage);
            this._updateProgressBar();
        };

        return {
            seek: (percentage) => {
                seek(percentage);
            },
            leap: (direction) => {
                let progress = this.state.progress;
                progress += this.leapPercentage * (direction ? 1 : -1);
                seek(progress);
            }
        };
    }

    // make state updated with current video progress
    // so that progress bar can also be updated
    _updateProgressBar() {
        if (this.videoPlayer && this.state.playing) {
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
                    onClick={() => this.props.onProceed(!this.state.playing)}>
                    {this.props.sources.map(src => <source key={src} src={src} />)}
                </video>

                {/* control bar */}
                <div className="row control-bar">
                    {/* play or pause */}
                    <div className="col-sm-1">
                        <span
                            className={`glyphicon glyphicon-${this.state.playing ? 'pause' : 'play'}`}
                            aria-hidden="true"
                            onClick={() => this.props.onProceed(!this.state.playing)}
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
    playing: PropTypes.bool,
    delegate: PropTypes.func,
    onProceed: PropTypes.func,
    onSeek: PropTypes.func
};

PlayerComp.defaultProps = {
    playing: false
};

export default PlayerComp;
