import React, { PropTypes } from 'react';

const ProgressBarComp = ({progress, onClick}) => {
    const clientWidth = document.body.clientWidth;
    const barCount = Math.floor(140 * (clientWidth / 1024));
    const indexes = [];
    for (let i = 0; i < barCount; i += 1) indexes.push(i);

    return (
        <span className="video-progress-bar">
            {indexes.map(i =>
                <span
                    key={i}
                    className={i > Math.floor(progress * barCount) ? 'unwatched' : 'watched'}
                    onClick={() => onClick(i / barCount)}>
                    |
                </span>
            )}
        </span>
    );
};

ProgressBarComp.propTypes = {
    progress: PropTypes.number,
    onClick: PropTypes.func
};

export default ProgressBarComp;
