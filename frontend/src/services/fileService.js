import axios from 'axios';

export const uploadFile = (formData) => {
  return axios.post('/api/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};