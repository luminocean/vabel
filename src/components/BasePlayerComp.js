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

    componentWillReceiveProps(nextProps) {
        if (nextProps.playing && !this.props.playing) {
            this.play();
        } else if (!nextProps.playing && this.props.playing) {
            this.pause();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.updatingInterval) {
            clearInterval(this.updatingInterval);
            this.updatingInterval = null;
        }
    }

    play() {
        this.setState({playing: true});
        this.videoPlayer.play();
    }

    pause() {
        this.setState({playing: false});
        this.videoPlayer.pause();
    }

    // a hook for descendants when video is loaded
    loaded() {} // eslint-disable-line class-methods-use-this

    seek(percentage) {
        if (!this.videoPlayer) return;
        this.videoPlayer.currentTime = Math.floor(this.videoDuration * percentage);
        this._updateProgress();
    }

    get progress() {
        return this.state.progress !== undefined ?
            this.state.progress : this.props.progress;
    }

    get delegate() {
        return {
            src: this.props.src,
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

    // make state updated with current video progress
    // so that progress bar can also be updated
    _updateProgress() {
        if (this.videoPlayer && this.state.playing) {
            const playedTime = Math.floor(this.videoPlayer.currentTime);
            const progress = playedTime / this.videoDuration;
            this.setState({progress});

            if (this.props.onProgressTick) {
                this.props.onProgressTick(progress);
            }
        }
    }

    _onToggle() {
        if (this.props.onToggle) {
            this.props.onToggle(this.state.playing);
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
                    onClick={() => this._onToggle()}>
                    <source src={this.props.src} />
                </video>
            </div>
        );
    }
}

BasePlayerComp.propTypes = {
    src: PropTypes.string,
    progress: PropTypes.number,
    playing: PropTypes.bool,
    delegate: PropTypes.func,
    onProgressTick: PropTypes.func,
    onToggle: PropTypes.func
};

BasePlayerComp.defaultProps = {
    progress: 0,
    playing: false
};

export default BasePlayerComp;
