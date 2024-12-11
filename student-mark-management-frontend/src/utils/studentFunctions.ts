import axios from 'axios';
import { Student } from '../components/StudentList';

const API_URL = 'http://localhost:3002/api/students';

export const fetchStudents = async (page: number = 1, limit: number = 3, searchQuery: string = '') => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                page,
                limit,
                searchQuery
            },
        });

        console.log({ response })
        return response?.data?.data || [];
    } catch (error) {
        console.error('Error fetching students:', error);
        throw new Error('Failed to fetch students');
    }
};

export const addStudent = async (newStudent: Student) => {
    try {
        const response = await axios.post(API_URL, newStudent);
        return response.data;
    } catch (error) {
        console.error('Error adding student:', error);
        throw new Error('Failed to add student');
    }
};

export const updateStudent = async (student: Student) => {
    try {
        const response = await axios.put(`${API_URL}/${student.id}`, student);
        return response.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw new Error('Failed to update student');
    }
};

export const deleteStudent = async (studentId: number) => {
    try {
        await axios.delete(`${API_URL}/${studentId}`);
    } catch (error) {
        console.error('Error deleting student:', error);
        throw new Error('Failed to delete student');
    }
};


// // Add a new student
// export const addStudent = async (newStudent: Student) => {
//     try {
//         const response = await fetch('/api/students', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newStudent),
//         });
//         if (!response.ok) {
//             throw new Error('Failed to add student');
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error adding student:', error);
//         throw new Error('Failed to add student');
//     }
// };

