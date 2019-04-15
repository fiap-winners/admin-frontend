import * as R from 'ramda';
import * as actions from './institute_actions';

const initialState = {
  data: [],
  meta: {
    fetched: false,
    fetching: false
  }
};

export default function InstituteReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.FETCH_INSTITUTE_REQUEST:
      return R.assocPath(['meta', 'fetching'], true, state);
    case actions.FETCH_INSTITUTE_SUCCESS:
      return R.compose(
        R.assocPath(['meta', 'fetching'], false),
        R.assocPath(['meta', 'fetched'], true),
        R.assoc('data', payload.institute)
      )(state);
    case actions.FETCH_INSTITUTE_FAILURE:
      return R.assocPath(['meta', 'fetching'], false, state);
    default:
      return state;
  }
}