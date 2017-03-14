import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RecordComp, { PropertyTypes as RecordCompPropTypes } from '../components/RecordComp';
import eventCenter from '../logic/eventCenter';
import { CONSTANTS as playerContants } from '../actions/playerActions';

class Record extends Component {
    _onClick(record) { // eslint-disable-line class-methods-use-this
        eventCenter.emit(playerContants.PLAYER_SEEK, record);
    }

    render() {
        return (
            <RecordComp
                records={this.props.records}
                onClick={record => this._onClick(record)}/>
        );
    }
}

Record.propTypes = {
    records: RecordCompPropTypes.records
};

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars
    records: state.crop.record.list
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line no-unused-vars
});

export default connect(mapStateToProps, mapDispatchToProps)(Record);
