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
            <div>
                {/* video */}
                {super.render()}

                {/* control bar */}
                <div className="control-bar">
                    {/* use style manually for better layout preciseion */}
                    {/* play or pause */}
                    <div style={{width: '5%', display: 'inline-block'}}>
                        <span
                            className={`player-icon glyphicon glyphicon-${this.state.playing ? 'pause' : 'play'}`}
                            onClick={() => this.props.onProceed(!this.state.playing)}
                        />
                    </div>

                    {/* progress bar */}
                    <div style={{width: '75%', display: 'inline-block'}}>
                        <ProgressBar
                            progress={this.progress}
                            onSeek={percentage => this.props.onSeek(percentage)} />
                    </div>

                    {/* timer */}
                    <div style={{width: '10%', display: 'inline-block', marginLeft: '2%'}}>
                        <span className="player-icon timer">{Utils.secondsToTimeString(this.videoDuration * this.progress)}</span>
                    </div>

                    <div style={{width: '8%', display: 'inline-block'}}>
                        <span className={'player-icon glyphicon glyphicon-scissors'} onClick={() => this.props.onCrop()}/>
                        <span className="player-icon  glyphicon glyphicon-fullscreen" onClick={() => this.videoPlayer.webkitRequestFullScreen()}/>
                    </div>
                </div>
            </div>
        );
    }
}

PlayerComp.propTypes = {
    onSeek: PropTypes.func,
    onCrop: PropTypes.func
};

export default PlayerComp;
