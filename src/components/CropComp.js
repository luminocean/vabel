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
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <textarea
                                        className="text-area"
                                        style={{width: '100%'}}
                                        onFocus={() => this.props.onEditing(true)}
                                        onBlur={() => this.props.onEditing(false)}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <PreviewComp
                                src={this.props.src}
                                progress={this.props.progress}
                                interval={this.props.interval}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <div className="col-sm-9"/>
                        <div className="col-sm-1">
                            <Button bsStyle="success" onClick={() => {}}>SAVE</Button>
                        </div>
                        <div className="col-sm-1">
                            <Button onClick={() => this.close()}>CANCEL</Button>
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
    onClose: PropTypes.func,
    onEditing: PropTypes.func
};

export default CropComponent;
