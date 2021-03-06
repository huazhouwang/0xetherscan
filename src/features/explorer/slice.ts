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
import { getFileExt } from "./utils";

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
    { getState }
  ) => {
    const apiKey = apiKeySelector(getState() as RootState, chainId);
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

export const isProjectExistSelector = createSelector(
  [
    sliceSelector,
    (state: RootState, payload: { chainId: ChainID; address: string }) =>
      payload,
  ],
  (state, { chainId, address }) =>
    entitySelectors.selectById(state, generateId(chainId, address)) !==
    undefined
);

export const allProjectsSelector = createSelector(
  sliceSelector,
  entitySelectors.selectAll
);

export type FileDetail = {
  id: string;
  projectId: string;
  filePath: string;
  content: string;
  ext: string;
};

export const getSpecificFileContentSelector = createSelector(
  [sliceSelector, (state: RootState, fileId: string) => fileId],
  (state, fileId) => {
    const firstSlashIndex = fileId.indexOf("/");
    const [projectId, filePath] = [
      fileId.slice(0, firstSlashIndex),
      fileId.slice(firstSlashIndex + 1),
    ];
    const content = getContentFromLocalStorage(projectId, filePath) || "";

    return {
      id: fileId,
      projectId,
      filePath,
      content,
      ext: getFileExt(filePath),
    } as FileDetail;
  }
);

export const getFilesSelector = createSelector(
  [
    (state: RootState) => state,
    (state: RootState, fileIds: string[]) => fileIds,
  ],
  (state, fileIds) =>
    fileIds.map((id) => getSpecificFileContentSelector(state, id))
);
