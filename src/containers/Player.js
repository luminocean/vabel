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

    componentWillReceiveProps(nextProps) {
        // toSeek property is used to control player video progress
        if (nextProps.toSeek) {
            this.component.seek(nextProps.toSeek);
            this.props.seekDone();
        } else if (nextProps.toLeap !== undefined) {
            this.component.leap(nextProps.toLeap);
            this.props.leapDone();
        }
    }

    render() {
        return (
            <div>
                <PlayerComponent
                    delegate={(delegate) => { this.component = delegate; }}
                    sources={this.state.sources}
                    isPlaying={this.props.isPlaying}
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
    seekDone: PropTypes.func,
    toLeap: PropTypes.bool,
    leapDone: PropTypes.func,
    onProceed: PropTypes.func,
    onSeek: PropTypes.func
};

const mapStateToProps = state => ({
    isPlaying: state.player.control.isPlaying,
    toSeek: state.player.progress.toSeek,
    toLeap: state.player.progress.toLeap
});

function mapDispatchToProps(dispatch) {
    const actionProps = {
        // user choose to proceed playing video or not
        onProceed: (proceed) => {
            if (proceed) dispatch(actions.play());
            else dispatch(actions.pause());
        },
        onSeek: percentage => dispatch(actions.seek(percentage)),
        seekDone: () => dispatch(actions.seekDone()),
        leapDone: () => dispatch(actions.leapDone())
    };
    return actionProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
