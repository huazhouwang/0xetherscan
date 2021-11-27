import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { hideMessageBar, messageBarSelector } from "./slice";
import { Alert, Snackbar } from "@mui/material";
import ExpandableHelperText from "../../components/expandable-helper-text";

const MessageBar = () => {
  const dispatch = useAppDispatch();
  const { status, message, severity } = useAppSelector(messageBarSelector);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={status === "open"}
      autoHideDuration={3000}
      onClose={() => dispatch(hideMessageBar())}
    >
      <Alert variant={"filled"} severity={severity}>
        <ExpandableHelperText
          title={severity?.toUpperCase() || ""}
          value={message}
        />
      </Alert>
    </Snackbar>
  );
};

export default MessageBar;
