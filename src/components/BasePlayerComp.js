import React, { PropTypes, Component } from 'react';

class BasePlayerComp extends Component {
    constructor(props) {
        super(props);
        this.videoPlayer = null;
        this.videoDuration = 0; // in seconds
        this.leapPercentage = 0.01;
        this.state = {
            playing: false,
            progress: 0, // in percentage
        };

        if (props.delegate) props.delegate(this.delegate);
    }

    componentDidMount() {
        // set timer
        this._updateProgress();
        setInterval(() => {
            this._updateProgress();
        }, 300);
    }

    componentWillReceiveProps(nextProps) {
        // do playing or pausing
        if (this.videoPlayer && nextProps.playing && !this.state.playing) {
            this.setState({playing: true});
            this.videoPlayer.play();
        } else if (this.videoPlayer && !nextProps.playing && this.props.playing) {
            this.setState({playing: false});
            this.videoPlayer.pause();
        }
    }

    set player(videoElemement) {
        const ele = videoElemement;
        if (!ele) return; // videoElemement might be undefined

        this.videoPlayer = ele;
        ele.ondurationchange = () => {
            this.videoDuration = ele.duration;
            this.videoPlayer.currentTime = this.props.video.progress * ele.duration;
        };
    }

    get delegate() {
        const seek = (percentage) => {
            if (!this.videoPlayer) return;
            this.videoPlayer.currentTime = Math.floor(this.videoDuration * percentage);
            this._updateProgress();
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
    _updateProgress() {
        if (this.videoPlayer && this.state.playing) {
            const playedTime = Math.floor(this.videoPlayer.currentTime);
            if (this.props.onProgressTick) {
                this.props.onProgressTick(playedTime / this.videoDuration);
            }
        }
    }

    render() {
        return (
            <video
                className="video"
                ref={(v) => { if (v) this.player = v; }}
                onClick={() => this.props.onProceed(!this.state.playing)}>
                <source src={this.props.video.src} />
            </video>
        );
    }
}

BasePlayerComp.propTypes = {
    video: PropTypes.shape({
        src: PropTypes.string,
        progress: PropTypes.number
    }),
    playing: PropTypes.bool,
    delegate: PropTypes.func,
    onProceed: PropTypes.func,
    onProgressTick: PropTypes.func
};

BasePlayerComp.defaultProps = {
    playing: false
};

export default BasePlayerComp;
