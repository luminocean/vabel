import React, { PropTypes } from 'react';

const Player = ({ src }) => { // eslint-disable-line
    return <video src={src} />;
};

Player.propTypes = {
    src: PropTypes.string
};

export default Player;
