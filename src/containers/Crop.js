import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CropComponent from '../components/CropComponent';
import * as actions from '../actions/cropActions';

class Crop extends Component {
    render() {
        return (
            <CropComponent show={this.props.show} onClose={() => this.props.onClose()} />
        );
    }
}

Crop.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func
};

const mapStateToProps = state => ({
    show: state.crop.control.croping
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line no-unused-vars
    onClose: () => dispatch(actions.cropDone())
});

export default connect(mapStateToProps, mapDispatchToProps)(Crop);
