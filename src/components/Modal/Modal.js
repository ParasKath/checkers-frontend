import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Button from 'react-bootstrap/Button';



const Mode = (props)=>{
    return(
    <React.Fragment>
    <Modal show={props.showModal} onHide={props.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.modalText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={props.handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      </React.Fragment>
    )}

    export default Mode;