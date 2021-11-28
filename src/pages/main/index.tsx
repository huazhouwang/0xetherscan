import SplitPane from "../../components/split-pane";
import { useCallback, useEffect, useState } from "react";
import Explorer from "../../features/explorer";
import EditorPane from "../../features/editor-pane";
import { useParams } from "react-router-dom";
import { fetchSourceCodeAsync } from "../../features/explorer/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ImportDialog from "../../components/import-dialog";
import AppBar from "../../components/app-bar";
import {
  ALL_CHAIN_CONFIG,
  allApiKeysSelector,
  ChainID,
  deleteApiKeyAction,
  updateApiKeyAction,
} from "../../features/global/slice";
import { Column, SizedBox } from "../../components/basic";
import { Box } from "@mui/material";

const LeftPanel = ({
  onFileSelected,
  onImportClick,
}: {
  onImportClick: () => void;
  onFileSelected: (name: string) => void;
}) => {
  return (
    <Explorer onImportClick={onImportClick} onFileSelected={onFileSelected} />
  );
};

const RightPane = ({ fileIds }: { fileIds: string[] }) => {
  return <EditorPane fileIds={fileIds} />;
};

const MainPage = () => {
  const [fileIds, setFileIds] = useState<string[]>(() => []);
  const [openImportDialog, setOpenImportDialog] = useState<boolean>(false);

  const onFileSelected = useCallback((id: string) => {
    setFileIds(() => [id]);
  }, []);

  return (
    <>
      <Column>
        <AppBar />
        <SizedBox height={64} />

        <Box>
          <SplitPane
            allowResize
            split={"vertical"}
            minSize={"20%"}
            defaultSize="20%"
          >
            <LeftPanel
              onImportClick={() => setOpenImportDialog(true)}
              onFileSelected={onFileSelected}
            />
            <RightPane fileIds={fileIds} />
          </SplitPane>
        </Box>
        <ContractImportHelper
          open={openImportDialog}
          setOpen={setOpenImportDialog}
        />
      </Column>
    </>
  );
};

const ContractImportHelper = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const routeParams = useParams();
  const dispatch = useAppDispatch();
  const apiKeys = useAppSelector(allApiKeysSelector);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchSourceCode = useCallback(
    async (chainId: ChainID, address: string) => {
      if (chainId && address) {
        try {
          setIsFetching(true);
          await dispatch(
            fetchSourceCodeAsync({
              chainId,
              address,
            })
          );
        } finally {
          setIsFetching(false);
        }
      }
    },
    [setIsFetching]
  );

  const onApiKeyUpdate = (chainId: ChainID, apiKey: string) => {
    if (apiKey) {
      dispatch(updateApiKeyAction({ chainId, apiKey }));
    } else {
      dispatch(deleteApiKeyAction({ chainId }));
    }
  };

  useEffect(() => {
    const { address } = routeParams || {};
    if (address) {
      fetchSourceCode("eth", address).then(console.log);
    }
  }, []);

  return (
    <ImportDialog
      open={open}
      isFetching={isFetching}
      onClose={() => setOpen(false)}
      chainIds={Object.keys(ALL_CHAIN_CONFIG)}
      initChainId={"eth"}
      apiKeys={apiKeys}
      onApiKeyUpdate={onApiKeyUpdate}
      onAddressSubmit={fetchSourceCode}
    />
  );
};

export default MainPage;
