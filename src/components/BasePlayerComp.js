import React, { PropTypes, Component } from 'react';

class BasePlayerComp extends Component {
    constructor(props) {
        super(props);
        this.mounted = false;

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
        this.mounted = true;
        // set timer
        this._updateProgress();
        this.updatingInterval = setInterval(() => {
            this._updateProgress();
        }, 300);
    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.updatingInterval) {
            clearInterval(this.updatingInterval);
            this.updatingInterval = null;
        }
    }

    setState(state) {
        if (this.mounted) super.setState(state);
        else console.error('setState on unmounted component!'); // eslint-disable-line
    }

    play() {
        this.setState({playing: true});
        this.videoPlayer.play();
    }

    get playing() {
        return this.videoPlayer && this.state.playing;
    }

    pause() {
        this.setState({playing: false});
        this.videoPlayer.pause();
    }

    get progress() {
        return this.state.progress !== undefined ?
            this.state.progress : this.props.progress;
    }

    set player(videoElemement) {
        const ele = videoElemement;
        if (!ele) return; // videoElemement might be undefined

        ele.ondurationchange = () => {
            this.videoPlayer = ele;
            this.videoDuration = ele.duration;
            this.videoPlayer.currentTime = this.progress;

            this.setState({
                loaded: true
            });
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
        if (this.playing) {
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
            <div>
                <h3 hidden={!!this.state.loaded}>Video Loading...</h3>
                <video
                    hidden={!this.state.loaded}
                    className="video"
                    ref={(v) => { if (v) this.player = v; }}
                    onClick={() => this.props.onProceed(!this.state.playing)}>
                    <source src={this.props.src} />
                </video>
            </div>
        );
    }
}

BasePlayerComp.propTypes = {
    src: PropTypes.string,
    progress: PropTypes.number,
    delegate: PropTypes.func,
    onProceed: PropTypes.func,
    onProgressTick: PropTypes.func
};

BasePlayerComp.defaultProps = {
    progress: 0
};

export default BasePlayerComp;
