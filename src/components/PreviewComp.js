import React, { PropTypes } from 'react';
import BasicPlayerComp from './BasePlayerComp';
import eventCenter from '../logic/eventCenter';
import * as cropActions from '../actions/cropActions';

class PreviewComp extends BasicPlayerComp {
    constructor(props) {
        super(props);

        this.state = {
            startTime: 0,
            endTime: 0,
            sampleTime: 0
        };
    }

    loaded() {
        super.loaded();
        this.reset();
        this._setupEventListeners();
    }

    reset() {
        const duration = this.videoDuration;
        const sampleTime = this.props.progress * duration;
        let startTime = sampleTime + this.props.interval;
        if (startTime < 0) startTime = 0;

        const endTime = sampleTime;
        const progress = startTime / duration;
        this.seek(progress);
        this.setState({sampleTime, startTime, endTime, progress});
    }

    play() {
        this.reset();
        super.play();
    }

    _setupEventListeners() {
        eventCenter.addListener(cropActions.CONSTANTS.CROP_REPLAY, () => {
            if (!this.state.playing) {
                this.play();
            } else {
                this.pause();
            }
        });
    }

    _updateProgress() {
        super._updateProgress();
        if (this.playing) {
            // exceed croping range, pause it
            if (this.state.progress >= this.state.endTime / this.videoDuration) {
                this.pause();
            }
        }
    }

    render() {
        return (
            <div className="preview-player row">
                <div className="row">
                    {super.render()}
                </div>

                <div className="row">
                    <div className="col-sm-5">
                        {this.state.startTime - this.state.sampleTime}s
                    </div>
                    <div className="col-sm-5">
                        <span
                            className="glyphicon glyphicon-repeat"
                            onClick={() => this.play()}/>
                    </div>
                    <div className="col-sm-2c">
                        {this.state.endTime - this.state.sampleTime}s
                    </div>
                </div>
            </div>
        );
    }
}

PreviewComp.propTypes = {
    interval: PropTypes.number
};

export default PreviewComp;
