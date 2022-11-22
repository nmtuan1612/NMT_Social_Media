import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

const saveToLocalStorage = (store) => {
  try {
    const serializedStore = JSON.stringify(store);
    localStorage.setItem("store", serializedStore);
  } catch (error) {
    console.log(error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedStore = localStorage.getItem("store");
    return serializedStore === null ? undefined : JSON.parse(serializedStore);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

// whenever have a change in store then the change will be reflected in localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
