import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

type State = {
  message: string;
  severity?: "error" | "warning" | "info" | "success";
  status: "close" | "open";
};

const initialState: State = {
  message: "",
  severity: "info",
  status: "close",
};

const slice = createSlice({
  name: "message-bar",
  initialState,
  reducers: {
    show: (
      state,
      action: PayloadAction<Pick<State, "severity" | "message">>
    ) => {
      Object.assign(state, {
        status: "open",
        ...action.payload,
      });
    },
    hide: (state) => {
      Object.assign(state, {
        status: "close",
        message: "",
        severity: "info",
      });
    },
  },
});

export default slice.reducer;
export const { show: showMessageBar, hide: hideMessageBar } = slice.actions;
export const selectMessageBar = (state: RootState) => state.messageBar;
