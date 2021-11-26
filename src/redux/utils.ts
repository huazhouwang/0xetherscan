import { RootState } from "./store";

export const createSliceSelector =
  <K extends keyof RootState>(key: K) =>
  (state: RootState) =>
    state[key];
