import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../actions/indexActions';
import AppComponent from '../components/AppComp';

class App extends Component {
    render() {
        return <AppComponent />;
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
