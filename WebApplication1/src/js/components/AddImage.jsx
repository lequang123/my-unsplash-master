import React, { PureComponent } from 'react';
import Modal from "react-bootstrap/Modal";


class AddImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            url: ''
        }
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    handleSubmit = () => {
        const {label, url} = this.state;
        this.props.handleSubmit(label, url);
    }


    render() {
        const {showModal, handleCloseModal} = this.props;
        const {label, url} = this.state
        return (
            <div>
                <Modal
                show={showModal}
                onHide={handleCloseModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add a new photo
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="label">Label</div>
                    <input
                        type="text"
                        className="input-label" 
                        placeholder="Suspendisse elit massa"
                        name="label"
                        value={label}
                        onChange={this.handleChange}
                    />
                    <div className="label">Photo URL</div>
                    <input
                        type="text"
                        className="input-photo"
                        placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
                        name="url"
                        value={url}
                        onChange={this.handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                <button className="btn-close" onClick={handleCloseModal}>Cancel</button>
                <button className="btn-submit" onClick={this.handleSubmit}>Submit</button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}

export default AddImage;