// @flow

import axios from 'axios';

export function fetchDocuments(instituteId: number) {
  return axios.get(`http://localhost:8080/api/institutes/${instituteId}/documents`)
    .then(({ data }) => data._embedded.documents);
}

export function createDocument(document: any) {
  return axios.post(`http://localhost:8080/api/documents`, document);
}