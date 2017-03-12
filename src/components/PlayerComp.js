import React, { PropTypes, Component } from 'react';
import VideoComp from './VideoComp';
import ProgressBar from './ProgressBarComp';
import Utils from '../logic/utils';
import './player.scss';

class PlayerComp extends VideoComp {
    componentDidMount() {
        // set timer
        this._updateProgressBar();
        setInterval(() => {
            this._updateProgressBar();
        }, 300);
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
                {/* video */}
                {super.render()}

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
    onSeek: PropTypes.func
};

export default PlayerComp;
