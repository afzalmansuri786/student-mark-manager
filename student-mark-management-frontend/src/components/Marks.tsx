import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import AddMark from './AddMark';
import UpdateMark from './UpdateMark';

interface MarksProps {
    studentId: number;
    show: boolean;
    onClose: () => void;
}

const Marks = ({ studentId, show, onClose }: MarksProps) => {
    const [marks, setMarks] = useState<any[]>([]);
    const [showAddMarkModal, setShowAddMarkModal] = useState(false);
    const [showUpdateMarkModal, setShowUpdateMarkModal] = useState(false);
    const [updateMark, setUpdateMark] = useState<any>({ id: 0, subject: '', mark: 0 });

    useEffect(() => {
        const fetchMarks = async () => {
            if (studentId) {
                try {
                    const response = await axios.get(`http://localhost:3002/api/marks/student/${studentId}`);
                    setMarks(response.data?.data);
                } catch (error) {
                    console.error('Error fetching marks:', error);
                }
            }
        };
        if (show) {
            fetchMarks();
        }
    }, [studentId, show]);

    const handleAddMark = (newMark: any) => {
        setMarks((prevMarks) => [...prevMarks, newMark]);
    };

    const handleDeleteMark = async (markId: number) => {
        try {
            await axios.delete(`http://localhost:3002/api/marks/${markId}`);
            setMarks((prevMarks) => prevMarks.filter((mark) => mark.id !== markId));
        } catch (error) {
            console.error('Error deleting mark:', error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Marks for Student ID {studentId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={() => setShowAddMarkModal(true)} style={{ marginBottom: '10px' }}>
                        Add Mark
                    </Button>

                    <h4>Marks List</h4>
                    {marks.length === 0 ? (
                        <p>No marks available.</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Mark</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marks.map((mark) => (
                                    <tr key={mark.id}>
                                        <td>{mark.subject}</td>
                                        <td>{mark.mark}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={() => {
                                                    setUpdateMark(mark);
                                                    setShowUpdateMarkModal(true);
                                                }}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Update
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteMark(mark.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Mark Modal */}
            <AddMark
                studentId={studentId}
                show={showAddMarkModal}
                onClose={() => setShowAddMarkModal(false)}
                onAddMark={handleAddMark}
            />

            {/* Update Mark Modal */}
            <UpdateMark
                mark={updateMark}
                show={showUpdateMarkModal}
                onClose={() => setShowUpdateMarkModal(false)}
                onUpdateMark={(updatedMark) => {
                    setMarks((prevMarks) =>
                        prevMarks.map((mark) => (mark.id === updatedMark.id ? updatedMark : mark))
                    );
                }}
            />
        </>
    );
};

export default Marks;
