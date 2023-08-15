import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // middleware
);

// import reducer from "../reducer/index";

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";

// const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

// export const store = createStore(
//   reducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
