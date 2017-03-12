import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import './crop.css';

class CropComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    componentWillReceiveProps(nextProps) {
        // need to be explicity true or false
        if (nextProps.show === true) {
            this.setState({
                showModal: true
            });
        } else if (nextProps.show === false) {
            this.setState({
                showModal: false
            });
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
                    <p>I think this is a modal body.</p>
                </Modal.Body>
            </Modal>
        );
    }
}

CropComponent.propTypes = {
    show: PropTypes.bool, // eslint-disable-line
    onClose: PropTypes.func
};

export default CropComponent;
