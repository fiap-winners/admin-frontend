import axios from 'axios';

const apiUrl = 'https://api.trustacademy.link';

export function fetchInstitute(instituteId: number) {
  const baseUrl = `${apiUrl}/institutes/${instituteId}`;
  return axios.all([
    axios.get(baseUrl),
    axios.get(`${baseUrl}/departments`),
    axios.get(`${baseUrl}/students`),
    axios.get(`${baseUrl}/document-types`)
  ]);
}