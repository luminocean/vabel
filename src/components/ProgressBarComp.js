import React, { PropTypes, Component } from 'react';

/**
 * Use cases:
 * - seeked
 * - proceed with video playing
 * - fast forward/backward
 */
class ProgressBarComp extends Component {
    render() {
        const clientWidth = document.body.clientWidth;
        // how many bars to display
        const barCount = Math.floor(120 * (clientWidth / 1024));
        const indexes = [];
        for (let i = 0; i < barCount; i += 1) indexes.push(i);
        return (
            <span className="video-progress-bar">
                {indexes.map(i =>
                    <span
                        key={i}
                        className={i > Math.floor(this.props.progress * barCount) ? 'unwatched' : 'watched'}
                        onClick={() => this.props.onSeek(i / barCount)}>
                        |
                    </span>
                )}
            </span>
        );
    }
}

ProgressBarComp.propTypes = {
    progress: PropTypes.number,
    onSeek: PropTypes.func
};

export default ProgressBarComp;
