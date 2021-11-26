import {
  configureStore,
  ThunkAction,
  Action,
  compose,
  combineReducers,
} from "@reduxjs/toolkit";
import persistState, { mergePersistedState } from "redux-localstorage";
import storageAdapter from "redux-localstorage/lib/adapters/localStorage";
import stateFilter from "redux-localstorage-filter";

import * as globalSlice from "../features/global/slice";
import * as messageBarSlice from "../features/message-bar/slice";
import * as explorerSlice from "../features/explorer/slice";

const rootReducer = combineReducers({
  [globalSlice.NAMESPACE]: globalSlice.reducer,
  [messageBarSlice.NAMESPACE]: messageBarSlice.reducer,
  [explorerSlice.NAMESPACE]: explorerSlice.reducer,
});

const persistStorage = compose(
  stateFilter([globalSlice.NAMESPACE, explorerSlice.NAMESPACE])
)(storageAdapter(window.localStorage));
export const store = configureStore({
  reducer: compose(mergePersistedState())(rootReducer) as typeof rootReducer,
  enhancers: [persistState(persistStorage) as never],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
