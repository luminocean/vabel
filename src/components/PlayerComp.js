import React, { PropTypes, Component } from 'react';
import BasicPlayerComp from './BasePlayerComp';
import ProgressBar from './ProgressBarComp';
import Utils from '../logic/utils';
import './player.scss';

class PlayerComp extends BasicPlayerComp {
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
                            progress={this.props.progress}
                            onSeek={percentage => this.props.onSeek(percentage)} />
                    </div>

                    {/* timer */}
                    <div className="col-sm-1">
                        <span className="timer">{Utils.secondsToTimeString(this.videoDuration * this.props.progress)}</span>
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
