import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

interface UpdateMarkProps {
    mark: any;
    show: boolean;
    onClose: () => void;
    onUpdateMark: (updatedMark: any) => void;
}

const UpdateMark = ({ mark, show, onClose, onUpdateMark }: UpdateMarkProps) => {
    const [updateMark, setUpdateMark] = useState({ id: 0, subject: '', mark: 0 });

    useEffect(() => {
        if (show && mark) {
            setUpdateMark({ id: mark.id, subject: mark.subject, mark: mark.mark });
        }
    }, [show, mark]);

    const handleUpdateMark = async () => {
        try {
            const updatedMarkData = { mark: updateMark.mark };
            await axios.put(`http://localhost:3002/api/marks/${updateMark.id}`, updatedMarkData);
            onUpdateMark({ ...mark, ...updatedMarkData });
            onClose();
        } catch (error) {
            console.error('Error updating mark:', error);
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Mark</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formUpdateSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="text"
                            value={updateMark.subject}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group controlId="formUpdateMark">
                        <Form.Label>Mark</Form.Label>
                        <Form.Control
                            type="number"
                            value={updateMark.mark}
                            onChange={(e) => setUpdateMark({ ...updateMark, mark: parseInt(e.target.value) })}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleUpdateMark}>
                        Update Mark
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateMark;
