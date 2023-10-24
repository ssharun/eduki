import axios from 'axios';

/*

Set up token for valid request in token const

*/

export const token = ``;

export const axiosInstance = axios.create({
  baseURL: 'https://api.eduki.com/api/v1/',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
