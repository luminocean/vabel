import React, { PropTypes } from 'react';

const ProgressBarComp = ({max, min, interval, className, onClick}) => {
    const barCount = Math.floor((max - min) / interval);
    const indexes = [];
    for (let i = 0; i < barCount; i += 1) indexes.push(i);

    return (
        <span className={className}>
            {indexes.map(i =>
                <span
                    key={i}
                    onClick={() => onClick(i)}
                >|</span>)}
        </span>
    );
};

ProgressBarComp.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    interval: PropTypes.number,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default ProgressBarComp;
