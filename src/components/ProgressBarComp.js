import React, { PropTypes, Component } from 'react';
import Util from '../logic/utils';

/**
 * Use cases:
 * - seeked
 * - proceed with video playing
 * - fast forward/backward
 */
class ProgressBarComp extends Component {
    constructor(props) {
        super(props);
        this.bar = null;

        this.state = {
            barCount: 50 // default value
        };
    }

    componentDidMount() {
        // we cannot decide how much bar we need until this element is mounted
        // so that we can get its PARENT'S (which is sort of a container) width
        const container = this.bar.parentNode;
        const leftPadding = getComputedStyle(container).paddingLeft.match(/(\d+)/)[1];
        const rightPadding = getComputedStyle(container).paddingRight.match(/(\d+)/)[1];

        const barWidth = container.offsetWidth - leftPadding - rightPadding;
        const charWidth = Util.getRootFontWidth(this.bar, '|');

        setTimeout(() => {
            this.setState({
                barCount: Math.floor(barWidth / charWidth)
            });
        }, 0);
    }

    render() {
        const indexes = [];
        for (let i = 0; i < this.state.barCount; i += 1) indexes.push(i);
        return (
            <span className="player-progress-bar" ref={(bar) => { this.bar = bar; }}>
                {indexes.map(i => (
                    <span
                        key={i}
                        className={i > Math.floor(this.props.progress * this.state.barCount) ? 'unwatched' : 'watched'}
                        onClick={() => this.props.onSeek(i / this.state.barCount)}>
                        |
                    </span>
                ))}
            </span>
        );
    }
}

ProgressBarComp.propTypes = {
    progress: PropTypes.number,
    onSeek: PropTypes.func
};

export default ProgressBarComp;
