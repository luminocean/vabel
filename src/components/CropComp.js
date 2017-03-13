import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import BasePlayerComp from './BasePlayerComp';
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
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5" />
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <BasePlayerComp src={this.props.video.src} progress={this.props.video.progress} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-5">
                                        -15s
                                    </div>
                                    <div className="col-sm-5">
                                        <span className="glyphicon glyphicon-repeat" aria-hidden="true"/>
                                    </div>
                                    <div className="col-sm-2c">
                                        0s
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

CropComponent.propTypes = {
    video: PropTypes.shape({
        src: PropTypes.string,
        progress: PropTypes.number
    }),
    show: PropTypes.bool, // eslint-disable-line
    onClose: PropTypes.func
};

export default CropComponent;
