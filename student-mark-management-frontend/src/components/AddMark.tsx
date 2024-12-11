import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

interface AddMarkProps {
    studentId: number;
    show: boolean;
    onClose: () => void;
    onAddMark: (mark: any) => void; 
}

const AddMark = ({ studentId, show, onClose, onAddMark }: AddMarkProps) => {
    const [newMark, setNewMark] = useState({ subject: '', mark: 0 });

    const handleAddMark = async () => {
        if (!newMark.subject || newMark.mark <= 0) {
            alert("Please provide both subject and a valid mark.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3002/api/marks`, { ...newMark, studentId });
            onAddMark(response.data?.data);  
            setNewMark({ subject: '', mark: 0 }); 
            onClose(); 
        } catch (error) {
            console.error('Error adding mark:', error);
            alert("Failed to add mark. Please try again.");
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Mark</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter subject"
                            value={newMark.subject}
                            onChange={(e) => setNewMark({ ...newMark, subject: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMark">
                        <Form.Label>Mark</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter mark"
                            value={newMark.mark}
                            onChange={(e) => setNewMark({ ...newMark, mark: parseInt(e.target.value) })}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddMark}>
                        Add Mark
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

export default AddMark;
