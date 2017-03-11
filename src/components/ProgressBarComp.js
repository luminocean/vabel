import React, { PropTypes } from 'react';

const ProgressBarComp = ({className, max, min, interval, progress, onClick}) => {
    const barCount = Math.floor((max - min) / interval);
    const indexes = [];
    for (let i = 0; i < barCount; i += 1) indexes.push(i);

    return (
        <span className={`video-progress-bar ${className}`}>
            {indexes.map(i =>
                <span
                    key={i}
                    className={i > Math.floor(progress * barCount) ? 'unwatched' : 'watched'}
                    onClick={() => onClick(i)}
                >|</span>)}
        </span>
    );
};

ProgressBarComp.propTypes = {
    className: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    interval: PropTypes.number,
    progress: PropTypes.number,
    onClick: PropTypes.func
};

export default ProgressBarComp;
