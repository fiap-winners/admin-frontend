import axios from 'axios';

export function fetchInstitute(instituteId: number) {
  return axios.get(`${process.env.REACT_APP_BASE_API_URL}/institutes/${instituteId}`)
    .then(({ data }) => data);
}