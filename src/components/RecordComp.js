import React, { PropTypes } from 'react';

const RecordComp = ({records, onClick}) => (
    <div>
        {records.map((r, i) => (
            <div key={i}>
                <span onClick={() => onClick(r)}>{r.text}</span>
            </div>
        ))}
    </div>
);

export const PropertyTypes = {
    records: PropTypes.arrayOf(PropTypes.shape({
        startTime: PropTypes.number,
        endTime: PropTypes.number,
        text: PropTypes.string
    }))
};

RecordComp.propTypes = {
    records: PropertyTypes.records,
    onClick: PropTypes.func
};

RecordComp.defaultProps = {
    records: []
};

export default RecordComp;

