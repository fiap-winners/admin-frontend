// @flow

import * as api from './document_api';

const baseApiUrl = process.env.REACT_APP_BASE_API_URL;

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
      type: `${baseApiUrl}/documentTypes/${document.type.id}`,
      student: `${baseApiUrl}/students/${document.student.id}`,
      institute: `${baseApiUrl}/institutes/${document.institute.id}`,
      department: `${baseApiUrl}/departments/${document.department.id}`,
      course: `${baseApiUrl}/courses/${document.course.id}`,
      createdAt: now,
      modifedAt: now
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