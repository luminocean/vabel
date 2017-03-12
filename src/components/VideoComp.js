import React, { PropTypes, Component } from 'react';

class VideoComp extends Component {
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

    render() {
        return (
            <video
                id="video"
                className="player-video"
                ref={(v) => { if (v) this.player = v; }}
                onClick={() => this.props.onProceed(!this.state.playing)}>
                {this.props.sources.map(src => <source key={src} src={src} />)}
            </video>
        );
    }
}

VideoComp.propTypes = {
    sources: PropTypes.arrayOf(PropTypes.string),
    playing: PropTypes.bool,
    delegate: PropTypes.func,
    onProceed: PropTypes.func
};

VideoComp.defaultProps = {
    playing: false
};

export default VideoComp;
