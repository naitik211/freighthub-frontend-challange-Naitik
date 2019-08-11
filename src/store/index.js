import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import { saveState, loadState } from './localStorage';

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

store.subscribe(() => {
  saveState(store.getState());
});
export default store;
