import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerComponent from '../components/PlayerComp';
import * as playerActions from '../actions/playerActions';
import * as videoActions from '../actions/videoActions';
import eventCenter from '../logic/eventCenter';


class Player extends Component {
    // no need to go through redux store,
    // just handle it locally
    onSeek(percentage) {
        this.component.seek(percentage);
    }

    toLeap(direction) {
        this.component.leap(direction);
    }

    set delegate(comp) {
        if (comp) {
            this.component = comp;
            eventCenter.addListener(playerActions.CONSTANTS.PLAYER_LEAP,
                direction => this.toLeap(direction));
        }
    }
    render() {
        return (
            <div>
                <PlayerComponent
                    delegate={(delegate) => { this.delegate = delegate; }}
                    src={this.props.video.src}
                    progress={this.props.video.progress}
                    onProceed={this.props.onProceed}
                    onSeek={percentage => this.onSeek(percentage)}
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
    onProceed: PropTypes.func,
    onProgressTick: PropTypes.func
};

const mapStateToProps = state => ({
    video: state.video
});

const mapDispatchToProps = (dispatch) => {
    const actionProps = {
        // user choose to proceed playing video or not
        onProceed: (proceed) => {
            if (proceed) dispatch(playerActions.play());
            else dispatch(playerActions.pause());
        },
        onProgressTick: progress => dispatch(videoActions.tick(progress))
    };
    return actionProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
