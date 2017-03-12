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
            lastSeeked: 0, // in percentage
            progress: 0, // in percentage
            progressSec: 0 // in seconds
        };
    }

    // set timer
    componentDidMount() {
        setInterval(() => {
            if (this.videoPlayer && this.state.isPlaying) {
                const time = Math.floor(this.videoPlayer.currentTime);
                const duration = Math.floor(this.videoPlayer.duration);

                this.setState({
                    progress: time / duration,
                    progressSec: time
                });
            }
        }, 1000);
    }

    // to update control icon appearance
    componentWillUpdate(nextProps) {
        if (nextProps.isPlaying && !this.state.isPlaying) {
            this.state.isPlaying = true;
            this.videoPlayer.toPlay = true;
        } else if (!nextProps.isPlaying && this.props.isPlaying) {
            this.state.isPlaying = false;
            this.videoPlayer.toPause = true;
        }
    }

    // control player
    componentDidUpdate() {
        // play or pause
        if (this.videoPlayer.toPlay) {
            this.videoPlayer.play();
            this.videoPlayer.toPlay = false;
        } else if (this.videoPlayer.toPause) {
            this.videoPlayer.pause();
            this.videoPlayer.toPause = false;
        }

        // seek
        if (this.props.seek !== this.state.lastSeeked) {
            const duration = this.videoPlayer.duration;
            this.videoPlayer.currentTime = Math.floor(duration * this.props.seek);
            this.state.lastSeeked = this.props.seek;
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
                            onClick={percentage => this.props.onSeek(percentage)} />
                    </div>

                    {/* timer */}
                    <div className="col-sm-1">
                        <span className="timer">{Utils.secondsToTimeString(this.state.progressSec)}</span>
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
    seek: PropTypes.number,
    onProceed: PropTypes.func,
    onSeek: PropTypes.func
};

PlayerComp.defaultProps = {
    isPlaying: false,
    seek: 0
};

export default PlayerComp;
