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
                    sources={this.state.sources}
                    isPlaying={this.props.isPlaying}
                    toSeek={this.props.toSeek}
                    onProceed={this.props.onProceed}
                    onSeek={this.props.onSeek}
                    />
            </div>
        );
    }
}

Player.propTypes = {
    isPlaying: PropTypes.bool,
    toSeek: PropTypes.number,
    onProceed: PropTypes.func,
    onSeek: PropTypes.func
};

const mapStateToProps = state => ({
    isPlaying: state.player.control.isPlaying,
    toSeek: state.player.progress.toSeek
});

function mapDispatchToProps(dispatch) {
    const actionProps = {
        // user choose to proceed playing video or not
        onProceed: (proceed) => {
            if (proceed) dispatch(actions.play());
            else dispatch(actions.pause());
        },
        onSeek: percentage => dispatch(actions.seek(percentage))
    };
    return actionProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
