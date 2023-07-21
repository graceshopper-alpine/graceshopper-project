import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import main from "./mainSlice";
import productsSlice from "./productsSlice";
import singleProductSlice from "./singleProductSlice";
import usersSlice from "./adminUsersSlice";
import userSlice from "./adminUserSlice"

const reducer = combineReducers({
  auth,
  main,
  productsSlice,
  singleProductSlice,
  usersSlice,
  userSlice
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
