import { ChainID } from "../../features/global/slice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Button,
  CircularProgress,
  DialogActions,
  FormControl,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";
import { Row, SizedBox } from "../basic";
import { useCallback, useState } from "react";
import { TextField } from "@mui/material";
import { isValidAddress } from "../../utils/eth-utils";

const ChainSelector = ({
  chainIds,
  selectedChainId,
  onSelectedChanged,
}: {
  chainIds: ChainID[];
  selectedChainId: ChainID;
  onSelectedChanged: (chainId: ChainID) => void;
}) => {
  return (
    <FormControl>
      <Select
        variant={"outlined"}
        value={selectedChainId}
        onChange={(e) => onSelectedChanged(e.target.value as ChainID)}
      >
        {chainIds.map((chainId) => (
          <MenuItem key={chainId} value={chainId}>
            {chainId.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const ApiKeyField = ({
  initApiKey,
  onApiKeyUpdated,
}: {
  initApiKey: string | undefined;
  onApiKeyUpdated: (apiKey: string) => void;
}) => {
  const [apiKey, setApiKey] = useState(initApiKey || "");

  const updateApiKey = useCallback(() => {
    onApiKeyUpdated(apiKey); // todo show double check button when delete?
  }, [apiKey]);

  return (
    <TextField
      variant="outlined"
      label={"API KEY"}
      value={apiKey}
      sx={{ flexGrow: 1 }}
      onChange={(e) => setApiKey(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && updateApiKey()}
    />
  );
};

type ImportDialogProps = {
  open: boolean;
  isFetching: boolean;
  onClose: () => void;
  chainIds: ChainID[];
  initChainId: ChainID;
  initAddress?: string;
  apiKeys: Record<string, string | undefined>;
  onApiKeyUpdate: (chainId: ChainID, apiKey: string) => void;
  onAddressSubmit: (chainId: ChainID, address: string) => void;
};

const ImportDialog = ({
  open,
  isFetching,
  onClose,
  chainIds,
  initChainId,
  initAddress,
  apiKeys,
  onApiKeyUpdate,
  onAddressSubmit,
}: ImportDialogProps) => {
  const [selectedChainId, setSelectedChainId] = useState<ChainID>(
    initChainId || "eth"
  );
  const [address, setAddress] = useState(initAddress || "");
  const addressValid = isValidAddress(address);

  const submitAddress = useCallback(() => {
    if (addressValid && !isFetching) {
      onAddressSubmit(selectedChainId, address);
    }
  }, [selectedChainId, address]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: "30%", maxWidth: 500 } }}
    >
      <DialogTitle>Import Contract</DialogTitle>
      <DialogContent>
        <SizedBox height={16} />

        <Row>
          <ChainSelector
            chainIds={chainIds}
            selectedChainId={selectedChainId}
            onSelectedChanged={setSelectedChainId}
          />

          <SizedBox width={8} />

          <ApiKeyField
            key={`${selectedChainId}_apikey`}
            initApiKey={apiKeys[selectedChainId]}
            onApiKeyUpdated={(apiKey) =>
              onApiKeyUpdate(selectedChainId, apiKey)
            }
          />
        </Row>

        <SizedBox height={20} />
        <TextField
          variant={"standard"}
          label={"ADDRESS"}
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && submitAddress()}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color={"primary"}
          onClick={submitAddress}
          disabled={!addressValid || isFetching}
        >
          {isFetching ? <CircularProgress size={26} /> : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportDialog;
