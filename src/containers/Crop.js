import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CropComponent from '../components/CropComp';
import * as actions from '../actions/cropActions';
import eventCenter from '../logic/eventCenter';

class Crop extends Component {
    onEditing(toEdit) { // eslint-disable-line
        console.info(`${toEdit ? 'Enter' : 'Exit'} editing mode`);
        eventCenter.emit(toEdit ?
            actions.CONSTANTS.CROP_ENTER_EDITING : actions.CONSTANTS.CROP_EXIT_EDITING);
    }

    render() {
        return (
            <CropComponent
                src={this.props.video.src}
                interval={-10}
                progress={this.props.video.progress}
                show={this.props.show}
                onClose={() => this.props.onClose()}
                onEditing={toEdit => this.onEditing(toEdit)}/>
        );
    }
}

Crop.propTypes = {
    video: PropTypes.shape({
        src: PropTypes.string,
        progress: PropTypes.number
    }),
    show: PropTypes.bool,
    onClose: PropTypes.func
};

const mapStateToProps = state => ({
    show: state.crop.control.croping,
    video: state.video
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line no-unused-vars
    onClose: () => dispatch(actions.cropDone())
});

export default connect(mapStateToProps, mapDispatchToProps)(Crop);
