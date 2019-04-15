import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer as reduxFormReducer } from 'redux-form';
import documentReducer from './institute/document/data/document_reducer';

const mainReducer = combineReducers({
  form: reduxFormReducer,
  document: documentReducer
});

const configureStore = (initialState = {}) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    mainReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;