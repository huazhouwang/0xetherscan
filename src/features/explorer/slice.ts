import realFetchSourceCode, { ChainID } from "./fetch-source-code";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { createSliceSelector } from "../../redux/utils";
import { apiKeySelector } from "../global/slice";
import { RootState } from "../../redux/store";

export const NAMESPACE = "explorer";

export type Project = {
  id: string;
  chainId: ChainID;
  address: string;
  name: string;
  filePaths: string[];
  createdAt: number;
};

const generateId = (chainId: string, address: string) =>
  `${chainId}@${address}`.toLowerCase();

const entity = createEntityAdapter<Project>({
  selectId: (model) => model.id,
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

export const fetchSourceCodeAsync = createAsyncThunk(
  `${NAMESPACE}/fetchSourceCodeAsync`,
  async (
    { chainId, address }: { chainId: ChainID; address: string },
    thunkApi
  ) => {
    const apiKey = apiKeySelector(thunkApi.getState() as RootState, chainId);
    const source = await realFetchSourceCode(chainId, address, apiKey);
    return { chainId, source };
  },
  {
    condition: ({ chainId, address }, { getState }) => {
      const projectId = generateId(chainId, address);
      const project = entity
        .getSelectors()
        .selectById(sliceSelector(getState() as RootState), projectId);
      return typeof project === "undefined";
    },
  }
);

const slice = createSlice({
  name: NAMESPACE,
  initialState: entity.getInitialState(),
  reducers: {
    removeProjectById: entity.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSourceCodeAsync.fulfilled, (state, action) => {
      const {
        chainId,
        source: { name, address, files },
      } = action.payload;

      const projectId = generateId(chainId, address);

      Object.entries(files).forEach(([filePath, fileContent]) =>
        saveContentToLocalStorage(projectId, filePath, fileContent)
      );

      entity.addOne(state, {
        id: projectId,
        chainId,
        address,
        name,
        filePaths: Object.keys(files),
        createdAt: Date.now(),
      });
    });
  },
});

const saveContentToLocalStorage = (
  projectId: string,
  filePath: string,
  fileContent: string
) => localStorage.setItem(`${NAMESPACE}/${projectId}/${filePath}`, fileContent);

const getContentFromLocalStorage = (projectId: string, filePath: string) =>
  localStorage.getItem(`${NAMESPACE}/${projectId}/${filePath}`);

export const reducer = slice.reducer;
export const { removeProjectById } = slice.actions;

const sliceSelector = createSliceSelector(NAMESPACE);
const entitySelectors = entity.getSelectors();

export const allProjectsSelector = createSelector(
  sliceSelector,
  entitySelectors.selectAll
);

export const getSpecificFileContent = createSelector(
  [
    sliceSelector,
    (state: RootState, payload: { projectId: string; filePath: string }) =>
      payload,
  ],
  (state, { projectId, filePath }) =>
    getContentFromLocalStorage(projectId, filePath) || ""
);
