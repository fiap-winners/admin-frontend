// @flow

import axios from 'axios';

import * as api from './institute_api';

export const FETCH_INSTITUTE_REQUEST = 'FETCH_INSTITUTE_REQUEST';
export const FETCH_INSTITUTE_SUCCESS = 'FETCH_INSTITUTE_SUCCESS';
export const FETCH_INSTITUTE_FAILURE = 'FETCH_INSTITUTE_FAILURE';

export function fetchInstitute(instituteId: number) {
  return (dispatch => {
    dispatch({ type: FETCH_INSTITUTE_REQUEST });
    api.fetchInstitute(instituteId)
      .then(axios.spread((institute, departments, students, documentTypes) => {
        dispatch({
          type: FETCH_INSTITUTE_SUCCESS,
          payload: {
            institute: Object.assign({}, institute.data, {
              departments: departments.data,
              students: students.data,
              documentTypes: documentTypes.data
            })
          }
        });
      }))
      .catch(() => {
        dispatch({ type: FETCH_INSTITUTE_FAILURE });
      });
  });
}