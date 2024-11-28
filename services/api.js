import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const authenticate = async (user) => {
  return axios.post(`${API_BASE}/api/auth`, user);
};

export const fetchFiles = async (userId) => {
  const response = await axios.get(`${API_BASE}/api/files/${userId}`);
  return response.data;
};
