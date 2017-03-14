import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CropComponent from '../components/CropComp';
import * as actions from '../actions/cropActions';
import eventCenter from '../logic/eventCenter';

class Crop extends Component {
    onEditing(toEdit) { // eslint-disable-line
        console.info(`${toEdit ? 'Enter' : 'Exit'} editing mode`); // eslint-disable-line no-console
        eventCenter.emit(toEdit ?
            actions.CONSTANTS.CROP_ENTER_EDITING : actions.CONSTANTS.CROP_EXIT_EDITING);
    }

    render() {
        return (
            <CropComponent
                src={this.props.src}
                interval={-10}
                progress={this.props.progress}
                show={this.props.show}
                onCancel={() => this.props.onCancel()}
                onSave={data => this.props.onSave(data)}
                onEditing={toEdit => this.onEditing(toEdit)}/>
        );
    }
}

Crop.propTypes = {
    src: PropTypes.string,
    progress: PropTypes.number,
    show: PropTypes.bool,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
};

const mapStateToProps = state => ({
    show: state.crop.control.croping,
    src: state.video.src,
    progress: state.video.progress
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line no-unused-vars
    onCancel: () => dispatch(actions.cropCancel()),
    onSave: data => dispatch(actions.cropSave(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Crop);
