// @flow

import axios from 'axios';
import mocks from './document_mocks';

export function fetchDocuments(instituteId: number) {
  if (process.env.NODE_ENV === 'development') {
    return axios.get(`${process.env.REACT_APP_BASE_API_URL}/institutes/${instituteId}/documents`)
      .then(({ data }) => data._embedded.documents);
  }
  return new Promise(resolve => {
    resolve(mocks);
  });
}

export function createDocument(document: any) {
  if (process.env.NODE_ENV === 'development') {
    return axios.post(`${process.env.REACT_APP_BASE_API_URL}/documents`, document);
  }
}