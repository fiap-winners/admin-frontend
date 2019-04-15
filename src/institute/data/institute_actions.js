// @flow

import * as api from './institute_api';

export const FETCH_INSTITUTE_REQUEST = 'FETCH_INSTITUTE_REQUEST';
export const FETCH_INSTITUTE_SUCCESS = 'FETCH_INSTITUTE_SUCCESS';
export const FETCH_INSTITUTE_FAILURE = 'FETCH_INSTITUTE_FAILURE';

export function fetchInstitute(instituteId: number) {
  return (dispatch => {
    dispatch({ type: FETCH_INSTITUTE_REQUEST });
    api.fetchInstitute(instituteId)
      .then((institute) => {
        dispatch({ type: FETCH_INSTITUTE_SUCCESS, payload: { institute } });
      })
      .catch(() => {
        dispatch({ type: FETCH_INSTITUTE_FAILURE });
      });
  });
}