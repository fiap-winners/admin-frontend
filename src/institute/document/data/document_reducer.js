import * as R from 'ramda';
import * as actions from './document_actions';

const initialState = {
  data: [],
  meta: {
    fetched: false,
    fetching: false
  }
};

export default function DocumentReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.FETCH_DOCUMENTS_REQUEST:
      return R.assocPath(['meta', 'fetching'], true, state);
    case actions.FETCH_DOCUMENTS_SUCCESS:
      return R.compose(
        R.assocPath(['meta', 'fetching'], false),
        R.assocPath(['meta', 'fetched'], true),
        R.assoc('data', payload.documents)
      )(state);
    case actions.FETCH_DOCUMENTS_FAILURE:
      return R.assocPath(['meta', 'fetching'], false, state);
    case actions.CREATE_DOCUMENT_REQUEST: {
      const updatedData = R.append(payload.document, state.data);
      return R.assoc('data', updatedData, state);
    }
    default:
      return state;
  }
}