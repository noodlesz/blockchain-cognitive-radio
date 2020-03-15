import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

import CurrentUserReducer from "./current-user/reducer";
import PageReducer from "./page/reducer"
import CategoryReducer from "./category/reducer"

const reducers = combineReducers({
  currentUser: CurrentUserReducer,
  form: formReducer,
  page: PageReducer,
  category: CategoryReducer,
});

const enhancers = [];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(thunk),
  ...enhancers
);

export default createStore(reducers, composedEnhancers);
