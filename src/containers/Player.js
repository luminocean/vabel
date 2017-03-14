import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerComp from '../components/PlayerComp';
import * as playerActions from '../actions/playerActions';
import * as videoActions from '../actions/videoActions';
import * as cropActions from '../actions/cropActions';
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
                <PlayerComp
                    delegate={(delegate) => { this.delegate = delegate; }}
                    src={this.props.src}
                    progress={this.props.progress}
                    playing={this.props.playing}
                    onSeek={percentage => this.onSeek(percentage)}
                    onProgressTick={progress => this.props.onProgressTick(progress)}
                    onCrop={() => this.props.onCrop()}
                    onToggle={playing => this.props.onToggle(playing)}
                    />
            </div>
        );
    }
}

Player.propTypes = {
    src: PropTypes.string,
    progress: PropTypes.number,
    playing: PropTypes.bool,
    onProgressTick: PropTypes.func,
    onCrop: PropTypes.func,
    onToggle: PropTypes.func
};

const mapStateToProps = state => ({
    src: state.video.src,
    progress: state.video.progress,
    playing: state.player.control.playing
});

const mapDispatchToProps = (dispatch) => {
    const actionProps = {
        onProgressTick: progress => dispatch(videoActions.tick(progress)),
        onCrop: () => dispatch(cropActions.crop()),
        onToggle: playing => dispatch(playing ? playerActions.pause() : playerActions.play())
    };
    return actionProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
