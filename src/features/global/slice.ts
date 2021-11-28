import {
  createDraftSafeSelector,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createSliceSelector } from "../../redux/utils";
import { RootState } from "../../redux/store";

export const NAMESPACE = "global";

export const ALL_CHAIN_CONFIG: Record<string, { icon?: string }> = {
  eth: {},
  bsc: {},
};
export type ChainID = keyof typeof ALL_CHAIN_CONFIG;

type GlobalState = {
  apiKeys: Record<string, string | undefined>;
};

const initialState: GlobalState = {
  apiKeys: {},
};

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    updateApiKey: (
      state,
      action: PayloadAction<{ chainId: ChainID; apiKey: string }>
    ) => {
      const { chainId, apiKey } = action.payload;
      if (chainId && apiKey) {
        state.apiKeys[chainId] = apiKey;
      }
    },

    deleteApiKey: (state, action: PayloadAction<{ chainId: ChainID }>) => {
      const { chainId } = action.payload;
      if (chainId) {
        delete state.apiKeys[chainId];
      }
    },
  },
});

export const reducer = slice.reducer;
export const {
  updateApiKey: updateApiKeyAction,
  deleteApiKey: deleteApiKeyAction,
} = slice.actions;

const sliceSelector = createSliceSelector(NAMESPACE);
export const allApiKeysSelector = createSelector(
  sliceSelector,
  (state) => state.apiKeys
);
export const apiKeySelector = createDraftSafeSelector(
  [sliceSelector, (state: RootState, chainId: ChainID) => chainId],
  (state, chainId) => state.apiKeys[chainId]
);
