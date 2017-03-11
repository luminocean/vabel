import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Player from '../components/Player';
import DemoVideo from '../../videos/demo.mp4';

class PlayerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: DemoVideo
        };
    }

    render() {
        return (
            <div>
                <Player src={this.state.src} />
            </div>
        );
    }
}

PlayerContainer.propTypes = {
    actions: PropTypes.shape({})
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
    const props = {};
    return props;
}

function mapDispatchToProps(dispatch) { // eslint-disable-line no-unused-vars
    const actionProps = {};
    return actionProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
