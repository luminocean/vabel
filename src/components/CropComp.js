import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
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
                            <div className="col-sm-6">
                                <div className="row">
                                    <textarea className="text-area col-sm-12" />
                                </div>
                            </div>
                            <div className="col-sm-1" />
                            <div className="col-sm-5">
                                <PreviewComp
                                    src={this.props.src}
                                    progress={this.props.progress}
                                    interval={this.props.interval}/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-11"/>
                            <div className="col-sm-1">
                                <Button onClick={() => this.close()}>Close</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
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
