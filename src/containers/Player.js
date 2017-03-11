import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerComponent from '../components/Player';
import * as actions from '../actions/player';
import DemoVideo from '../../videos/demo.mp4';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: [DemoVideo]
        };
    }

    render() {
        return (
            <div>
                <PlayerComponent
                    className={this.props.className}
                    sources={this.state.sources}
                    onPlay={this.props.onPlay} />
            </div>
        );
    }
}

Player.propTypes = {
    className: PropTypes.string,
    onPlay: PropTypes.func
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
    const props = {};
    return props;
}

function mapDispatchToProps(dispatch) { // eslint-disable-line no-unused-vars
    const actionProps = {
        onPlay: () => dispatch(actions.play())
    };
    return actionProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
