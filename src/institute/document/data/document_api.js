// @flow

import axios from 'axios';

const apiUrl = 'https://api.trustacademy.link';

export function fetchDocuments(instituteId: number) {
  return axios.get(`${apiUrl}/institutes/${instituteId}/documents`)
    .then(({ data }) => data);
}

export function createDocument(document: any) {
  const { institute, department, course, student, type } = document;
  const url = `${apiUrl}/institutes/${institute}/departments/${department}/courses/${course}/students/${student}/document-types/${type}/documents`;
  return axios.post(url, { content: document.content });
}