import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const SuccessModal = ({ show, message, onClose }: { show: boolean, message: string, onClose: () => void }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export const FailureModal = ({ show, message, onClose }: { show: boolean, message: string, onClose: () => void }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
