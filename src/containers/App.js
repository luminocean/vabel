import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../actions/';
import App from '../components/App';

class AppContainer extends Component {
    render() {
        const { actions } = this.props;
        return <App actions={actions} />;
    }
}

AppContainer.propTypes = {
    actions: PropTypes.shape({})
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
    const props = {};
    return props;
}

function mapDispatchToProps(dispatch) {
    const actions = {};
    const actionMap = { actions: bindActionCreators(actions, dispatch) };
    return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
