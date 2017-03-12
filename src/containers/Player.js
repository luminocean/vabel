import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerComponent from '../components/PlayerComp';
import * as actions from '../actions/playerActions';
import * as videoActions from '../actions/videoActions';

class Player extends Component {
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
                    video={this.props.video}
                    playing={this.props.playing}
                    onProceed={this.props.onProceed}
                    onSeek={this.props.onSeek}
                    onProgressTick={this.props.onProgressTick}/>
            </div>
        );
    }
}

Player.propTypes = {
    video: PropTypes.shape({
        src: PropTypes.string,
        progress: PropTypes.number
    }),
    playing: PropTypes.bool,
    toSeek: PropTypes.number, // eslint-disable-line
    toLeap: PropTypes.bool, // eslint-disable-line
    seekDone: PropTypes.func,
    leapDone: PropTypes.func,
    onProceed: PropTypes.func,
    onSeek: PropTypes.func,
    onProgressTick: PropTypes.func
};

const mapStateToProps = state => ({
    playing: state.player.control.playing,
    toSeek: state.player.progress.toSeek,
    toLeap: state.player.progress.toLeap,
    video: state.video
});

const mapDispatchToProps = (dispatch) => {
    const actionProps = {
        // user choose to proceed playing video or not
        onProceed: (proceed) => {
            if (proceed) dispatch(actions.play());
            else dispatch(actions.pause());
        },
        onProgressTick: progress => dispatch(videoActions.tick(progress)),
        onSeek: percentage => dispatch(actions.seek(percentage)),
        seekDone: () => dispatch(actions.seekDone()),
        leapDone: () => dispatch(actions.leapDone()),
    };
    return actionProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
