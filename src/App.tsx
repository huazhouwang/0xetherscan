import MessageBar from "./features/message-bar";
import { Button } from "@mui/material";
import { useAppDispatch } from "./redux/hooks";
import { showMessageBar } from "./features/message-bar/slice";

const Demo = () => {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() =>
        dispatch(
          showMessageBar({
            message: "time now: " + Date.now(),
            severity: "error",
          })
        )
      }
    >
      Time Now
    </Button>
  );
};

const App = () => {
  return (
    <>
      <Demo />
      <MessageBar />
    </>
  );
};

export default App;
