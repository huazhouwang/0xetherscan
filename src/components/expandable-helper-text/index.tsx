import { Row, SizedBox } from "../basic";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";
import { useState } from "react";

const ExpandableHelperText = ({
  title,
  value,
  stripThreshold = 50,
}: {
  title: string;
  value: string;
  stripThreshold?: number;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const isLongText = value && value.length >= stripThreshold;
  const stripText = isLongText
    ? value?.slice(0, stripThreshold) + "..."
    : value;

  return (
    <>
      {value && (
        <Row>
          {stripText}
          {isLongText && (
            <>
              <SizedBox width={3} />
              <Link
                component="button"
                onClick={() => setIsDialogOpen(true)}
                color={"inherit"}
                underline={"always"}
                aria-label={value}
              >
                more
              </Link>
              <Dialog
                scroll={"paper"}
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
              >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent dividers>
                  <DialogContentText>{value}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={() => setIsDialogOpen(false)}>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Row>
      )}
    </>
  );
};

export default ExpandableHelperText;
