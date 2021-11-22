import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import messageBarReducer from "../features/message-bar/slice";

export const store = configureStore({
  reducer: {
    messageBar: messageBarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
