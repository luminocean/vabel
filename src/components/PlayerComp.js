import React, { PropTypes } from 'react';
import BasicPlayerComp from './BasePlayerComp';
import ProgressBar from './ProgressBarComp';
import Utils from '../logic/utils';
import eventCenter from '../logic/eventCenter';
import * as playerActions from '../actions/playerActions';
import './player.scss';

class PlayerComp extends BasicPlayerComp {
    loaded() {
        super.loaded();
        this._setupEventListeners();
    }

    _setupEventListeners() {
        eventCenter.addListener(playerActions.CONSTANTS.PLAYER_PLAY, () => this.play());
        eventCenter.addListener(playerActions.CONSTANTS.PLAYER_PAUSE, () => this.pause());
    }

    render() {
        return (
            <div className="row">
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
