import axios from 'axios';


const API_URL = 'https://stud-record.vercel.app/api/students';

export const getStudents = async (filterOptions) => {
  const {course,age}= filterOptions;
  return axios.get(API_URL,{
    params: {
      course,
      age,
    },
  });
};

export const createStudent = async (studentData) => {
  return await axios.post(API_URL, studentData);
};

export const updateStudent = async (id, studentData) => {
  return await axios.put(`${API_URL}/${id}`, studentData);
};

export const deleteStudent = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

