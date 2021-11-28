import { MobileView } from "react-device-detect";
import { Center } from "../basic";
import SolidityLogo from "../../assets/solidity_logo_256.png";
import { Link, Typography } from "@mui/material";

const MobileNotSupported = () => {
  return (
    <MobileView>
      <Center
        sx={{
          flexDirection: "column",
          marginTop: 16,
        }}
      >
        <img src={SolidityLogo} alt={"solidity logo"} />
        <Typography align={"center"}>
          Please visit on PC, <br />
          or follow the{" "}
          <Link
            target={"_blank"}
            href={"https://github.com/huazhouwang/0xetherscan"}
          >
            project
          </Link>{" "}
          for more detail
        </Typography>
      </Center>
    </MobileView>
  );
};

export default MobileNotSupported;
