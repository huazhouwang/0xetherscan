import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSliceSelector } from "../../redux/utils";

export const NAMESPACE = "messageBar";

type MessageBarState = {
  message: string;
  severity?: "error" | "warning" | "info" | "success";
  status: "close" | "open";
};

const initialState: MessageBarState = {
  message: "",
  severity: "info",
  status: "close",
};

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    show: (
      state,
      action: PayloadAction<Pick<MessageBarState, "severity" | "message">>
    ) => {
      Object.assign(state, {
        status: "open",
        message: action.payload.message,
        severity: action.payload.severity || "info",
      });
    },
    hide: (state) => {
      Object.assign(state, {
        status: "close",
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return (
          action.type.endsWith("/rejected") && typeof action.error === "object"
        );
      },
      (state, action) => {
        console.error("Got error action: ", action);

        const { message } = action.error;
        if (message) {
          Object.assign(state, {
            status: "open",
            message: message,
            severity: "error",
          });
        }
      }
    );
  },
});

export const reducer = slice.reducer;
export const { show: showMessageBar, hide: hideMessageBar } = slice.actions;
export const messageBarSelector = createSliceSelector(NAMESPACE);
