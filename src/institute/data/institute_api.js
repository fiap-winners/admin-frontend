import axios from 'axios';

export function fetchInstitute(instituteId: number) {
  return axios.get(`http://localhost:8080/api/institutes/${instituteId}`)
    .then(({ data }) => data);
}