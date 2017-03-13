import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CropComponent from '../components/CropComp';
import * as actions from '../actions/cropActions';

class Crop extends Component {
    render() {
        return (
            <CropComponent
                src={this.props.video.src}
                interval={-10}
                progress={this.props.video.progress}
                show={this.props.show}
                onClose={() => this.props.onClose()} />
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
