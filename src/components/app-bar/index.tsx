import {
  AppBar as MuiAppBar,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const AppBar = () => {
  return (
    <MuiAppBar position={"absolute"}>
      <Toolbar>
        <Typography
          variant={"h6"}
          color={"inherit"}
          noWrap
          sx={{ flexGrow: 1 }}
        >
          0xetherscan
        </Typography>
        <IconButton
          target={"_blank"}
          href={"https://github.com/huazhouwang/0xetherscan"}
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
