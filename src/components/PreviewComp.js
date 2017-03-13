import React, { PropTypes } from 'react';
import BasicPlayerComp from './BasePlayerComp';
import eventCenter from '../logic/eventCenter';
import * as cropActions from '../actions/cropActions';

class PreviewComp extends BasicPlayerComp {
    constructor(props) {
        super(props);
        this._listeners = new Map();

        this.state = {
            startTime: 0,
            endTime: 0,
            sampleTime: 0
        };
    }

    loaded() {
        super.loaded();
        this.reset(true);
        this._listenEvents();
    }

    componentWillUnmount() {
        this._cancelEvents();
    }

    reset(hard) {
        const duration = this.videoDuration;
        let progress;
        if (hard) {
            const sampleTime = Math.floor(this.props.progress * duration);
            let startTime = sampleTime + this.props.interval;
            if (startTime < 0) startTime = 0;

            const endTime = sampleTime;
            progress = startTime / duration;
            this.setState({sampleTime, startTime, endTime, progress});
        } else {
            progress = this.state.startTime / duration;
        }
        this.seek(progress);
    }

    play() {
        this.reset();
        super.play();
    }

    _cancelEvents() {
        [...this._listeners.entries()].forEach((entry) => {
            const key = entry[0];
            const listeners = entry[1];
            listeners.forEach(listener => eventCenter.removeListener(key, listener));
        });
    }

    _listenEvents() {
        // save all the listeners for later cancelation
        this._listeners.set(cropActions.CONSTANTS.CROP_REPLAY, []);
        this._listeners.set(cropActions.CONSTANTS.CROP_ADJUST, []);

        this._listeners.get(cropActions.CONSTANTS.CROP_REPLAY).push(() => {
            if (!this.state.playing) this.play();
            else this.pause();
        });
        this._listeners.get(cropActions.CONSTANTS.CROP_ADJUST).push((type, delta) => {
            this._adjustTimeRange(type, delta);
        });

        // set listening all at once
        [...this._listeners.entries()].forEach((entry) => {
            const key = entry[0];
            const listeners = entry[1];
            listeners.forEach(listener => eventCenter.addListener(key, listener));
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

    _adjustTimeRange(type, delta) {
        // type is start or end
        const newTime = this.state[`${type}Time`] + delta;
        const newStatePartial = {};
        newStatePartial[`${type}Time`] = newTime;
        this.setState(newStatePartial);

        if (this.videoPlayer) this.videoPlayer.currentTime = newTime;
    }

    render() {
        return (
            <div className="preview-player">
                <div className="row">
                    <div className="col-sm-12">
                        {super.render()}
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-5">
                        <span
                            className="glyphicon glyphicon-chevron-left"
                            onClick={() => this._adjustTimeRange('start', -1)} />
                        <span className="leap-indicator">{this.state.startTime - this.state.sampleTime}s</span>
                        <span
                            className="glyphicon glyphicon-chevron-right"
                            onClick={() => this._adjustTimeRange('start', 1)}/>
                    </div>
                    <div className="col-sm-4">
                        <span
                            className="glyphicon glyphicon-repeat"
                            onClick={() => this.play()}/>
                    </div>
                    <div className="col-sm-3">
                        <span
                            className="glyphicon glyphicon-chevron-left"
                            onClick={() => this._adjustTimeRange('end', -1)} />
                        <span className="leap-indicator">{this.state.endTime - this.state.sampleTime}s</span>
                        <span
                            className="glyphicon glyphicon-chevron-right"
                            onClick={() => this._adjustTimeRange('end', 1)}/>
                    </div>
                </div>
            </div>
        );
    }
}

PreviewComp.propTypes = {
    interval: PropTypes.number // initial crop interval
};

export default PreviewComp;
