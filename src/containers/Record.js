import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../actions/indexActions';
import RecordComp from '../components/RecordComp';

class Record extends Component {
    render() {
        return <RecordComp />;
    }
}

const mapStateToProps = (state) => { // eslint-disable-line no-unused-vars
    const props = {};
    return props;
};

const mapDispatchToProps = (dispatch) => { // eslint-disable-line no-unused-vars
    const actionProps = {};
    return actionProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(Record);
