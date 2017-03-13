import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import PreviewComp from './PreviewComp';

import './crop.css';

class CropComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            startTime: 0, // in seconds
            endTime: 0 // in seconds
        };
    }

    componentWillReceiveProps(nextProps) {
        // show or hide this modal
        // need to be explicity true or false
        if (nextProps.show === true) {
            this.setState({showModal: true});
        } else if (nextProps.show === false) {
            this.setState({showModal: false});
        }
    }

    close() {
        this.setState({
            showModal: false
        });
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <Modal dialogClassName="crop-modal" show={this.state.showModal} onHide={() => this.close()}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5" />
                            <div className="col-sm-4">
                                <PreviewComp
                                    src={this.props.src}
                                    progress={this.props.progress}
                                    interval={this.props.interval}/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

CropComponent.propTypes = {
    src: PropTypes.string,
    progress: PropTypes.number,
    interval: PropTypes.number,
    show: PropTypes.bool, // eslint-disable-line
    onClose: PropTypes.func
};

export default CropComponent;
