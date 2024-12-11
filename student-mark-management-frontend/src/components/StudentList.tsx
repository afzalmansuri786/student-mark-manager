import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputGroup, Pagination } from 'react-bootstrap';
import { SuccessModal, FailureModal } from '../utils/modals';
import Marks from './Marks';
import { fetchStudents, deleteStudent, addStudent, updateStudent } from '../utils/studentFunctions';

export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

const StudentList = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [newStudent, setNewStudent] = useState<Student>({ id: 0, first_name: '', last_name: '', email: '' });
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [showMarksModal, setShowMarksModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

    useEffect(() => {
        fetchStudentList(currentPage);
    }, [currentPage]);

    const fetchStudentList = async (page: number) => {
        try {
            const { data, totalPages = 1 } = await fetchStudents(page, 3, searchQuery);
            setStudents(data);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching students:', error);
            setModalMessage('Failed to fetch students.');
            setShowFailureModal(true);
        }
    };

    const handleAddOrUpdateStudent = async () => {
        try {
            let studentData;
            if (newStudent.id) {
                studentData = await updateStudent(newStudent);
                setModalMessage('Student updated successfully.');
            } else {
                studentData = await addStudent(newStudent);
                setModalMessage('Student added successfully.');
            }
            fetchStudentList(currentPage);
            setShowAddStudentModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error adding/updating student:', error);
            setModalMessage('Failed to add/update student.');
            setShowFailureModal(true);
        }
    };

    const handleEdit = (studentId: number) => {
        const studentToEdit = students.find((student) => student.id === studentId);
        if (studentToEdit) {
            setNewStudent(studentToEdit);  // Set the student data to be edited
            setShowAddStudentModal(true);
        }
    };

    const handleDelete = async (studentId: number) => {
        try {
            await deleteStudent(studentId);
            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
            setModalMessage('Student deleted successfully.');
            setShowSuccessModal(true);
            fetchStudentList(currentPage);
        } catch (error) {
            console.error('Error deleting student:', error);
            setModalMessage('Failed to delete student.');
            setShowFailureModal(true);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        setCurrentPage(1);
        fetchStudentList(1);
    };

    const handleMarksClick = (studentId: number) => {
        setSelectedStudentId(studentId);
        setShowMarksModal(true);
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const range = 2;
        const start = Math.max(currentPage - range, 1);
        const end = Math.min(currentPage + range, totalPages);

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div>
            <h2>All students</h2>
            <div className="d-flex justify-content-between mb-3">
                <InputGroup style={{ width: '50%' }}>
                    <Form.Control
                        placeholder="Search by name or email"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </InputGroup>
                <Button variant="secondary" onClick={handleSearchClick}>
                    Search
                </Button>
                <Button variant="primary" onClick={() => {
                    setNewStudent({ id: 0, first_name: '', last_name: '', email: '' });
                    setShowAddStudentModal(true);
                }}>
                    Add New Student
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Marks</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.first_name} {student.last_name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <Button variant="info" onClick={() => handleMarksClick(student.id)}>
                                        Marks
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="warning" onClick={() => handleEdit(student.id)}>
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(student.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No students found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                {generatePageNumbers().map((pageNumber) => (
                    <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
            </Pagination>

            <Modal show={showAddStudentModal} onHide={() => setShowAddStudentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{newStudent.id ? 'Edit Student' : 'Add New Student'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={newStudent.first_name}
                                onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={newStudent.last_name}
                                onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })}
                            />
                        </Form.Group>
                        {newStudent?.id === 0 && <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={newStudent.email}
                                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                            />
                        </Form.Group>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddStudentModal(false)}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddOrUpdateStudent}
                    >
                        {newStudent.id ? 'Update Student' : 'Add Student'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {selectedStudentId && (
                <Marks
                    studentId={selectedStudentId}
                    show={showMarksModal}
                    onClose={() => setShowMarksModal(false)}
                />
            )}

            <SuccessModal
                show={showSuccessModal}
                message={modalMessage}
                onClose={() => setShowSuccessModal(false)}
            />

            <FailureModal
                show={showFailureModal}
                message={modalMessage}
                onClose={() => setShowFailureModal(false)}
            />
        </div>
    );
};

export default StudentList;
