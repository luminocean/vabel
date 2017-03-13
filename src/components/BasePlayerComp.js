import React, { PropTypes, Component } from 'react';

class BasePlayerComp extends Component {
    constructor(props) {
        super(props);
        this.videoPlayer = null;
        this.videoDuration = 0; // in seconds
        this.leapPercentage = 0.01;
        this.state = {
            playing: false,
            progress: undefined, // in percentage
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
            this.play();
        } else if (this.videoPlayer && !nextProps.playing && this.props.playing) {
            this.pause();
        }
    }

    play() {
        this.setState({playing: true});
        this.videoPlayer.play();
    }

    get isPlaying() {
        return this.videoPlayer && this.state.playing;
    }

    pause() {
        this.setState({playing: false});
        this.videoPlayer.pause();
    }

    set player(videoElemement) {
        const ele = videoElemement;
        if (!ele) return; // videoElemement might be undefined

        ele.ondurationchange = () => {
            this.videoPlayer = ele;
            this.videoDuration = ele.duration;
            if (this.state.progress !== undefined) {
                this.videoPlayer.currentTime = this.state.progress;
            } else {
                this.videoPlayer.currentTime = this.props.progress;
            }

            this.loaded();
        };
    }

    // a hook for descendants when video is loaded
    loaded() {} // eslint-disable-line class-methods-use-this

    seek(percentage) {
        if (!this.videoPlayer) return;
        this.videoPlayer.currentTime = Math.floor(this.videoDuration * percentage);
        this._updateProgress();
    }

    get delegate() {
        return {
            seek: (percentage) => {
                this.seek(percentage);
            },
            leap: (direction) => {
                let progress = this.state.progress;
                progress += this.leapPercentage * (direction ? 1 : -1);
                this.seek(progress);
            }
        };
    }

    // make state updated with current video progress
    // so that progress bar can also be updated
    _updateProgress() {
        if (this.isPlaying) {
            const playedTime = Math.floor(this.videoPlayer.currentTime);
            const progress = playedTime / this.videoDuration;
            this.setState({progress});

            if (this.props.onProgressTick) {
                this.props.onProgressTick(progress);
            }
        }
    }

    render() {
        return (
            <video
                className="video"
                ref={(v) => { if (v) this.player = v; }}
                onClick={() => this.props.onProceed(!this.state.playing)}>
                <source src={this.props.src} />
            </video>
        );
    }
}

BasePlayerComp.propTypes = {
    src: PropTypes.string,
    progress: PropTypes.number,
    playing: PropTypes.bool,
    delegate: PropTypes.func,
    onProceed: PropTypes.func,
    onProgressTick: PropTypes.func
};

BasePlayerComp.defaultProps = {
    playing: false,
    progress: 0
};

export default BasePlayerComp;
