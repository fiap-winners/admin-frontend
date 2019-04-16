// @flow

import * as api from './document_api';

export const CREATE_DOCUMENT_REQUEST = 'CREATE_DOCUMENT_REQUEST';
export const CREATE_DOCUMENT_SUCCESS = 'CREATE_DOCUMENT_SUCCESS';
export const CREATE_DOCUMENT_FAILURE = 'CREATE_DOCUMENT_FAILURE';

export const FETCH_DOCUMENTS_REQUEST = 'FETCH_DOCUMENTS_REQUEST';
export const FETCH_DOCUMENTS_SUCCESS = 'FETCH_DOCUMENTS_SUCCESS';
export const FETCH_DOCUMENTS_FAILURE = 'FETCH_DOCUMENTS_FAILURE';

export function createDocument(document: any) {
  const now = Date.now();
  return (dispatch => {
    api.createDocument({
      id: now,
      content: document.content,
      type: `http://localhost:8080/api/documentTypes/${document.type.id}`,
      student: `http://localhost:8080/api/students/${document.student.id}`,
      institute: `http://localhost:8080/api/institutes/${document.institute.id}`,
      department: `http://localhost:8080/api/departments/${document.department.id}`,
      course: `http://localhost:8080/api/courses/${document.course.id}`,
      createdAt: now,
      modifiedAt: now
    }).then(({ data }) => {
      dispatch({
        type: CREATE_DOCUMENT_REQUEST, payload: {
          document: Object.assign({}, data, data._embedded)
        }
      });
    });
  });
}

export function fetchDocuments(instituteId: number) {
  return (dispatch => {
    dispatch({ type: FETCH_DOCUMENTS_REQUEST });
    api.fetchDocuments(instituteId)
      .then((documents) => {
        dispatch({ type: FETCH_DOCUMENTS_SUCCESS, payload: { documents } });
      })
      .catch(() => {
        dispatch({ type: FETCH_DOCUMENTS_FAILURE });
      });
  });
}