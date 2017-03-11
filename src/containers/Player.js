import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerComponent from '../components/PlayerComp';
import * as actions from '../actions/playerActions';
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
                    onProceed={this.props.onProceed}
                    isPlaying={this.props.isPlaying} />
            </div>
        );
    }
}

Player.propTypes = {
    className: PropTypes.string,
    onProceed: PropTypes.func,
    isPlaying: PropTypes.bool
};

const mapStateToProps = state => ({
    isPlaying: state.player.control.isPlaying
});

function mapDispatchToProps(dispatch) {
    const actionProps = {
        // user choose to proceed playing video or not
        onProceed: (proceed) => {
            if (proceed) dispatch(actions.play());
            else dispatch(actions.pause());
        }
    };
    return actionProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
