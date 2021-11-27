import { Box, styled } from "@mui/material";

const Flex = styled(Box)({
  display: "flex",
});

const Column = styled(Flex)({
  flexDirection: "column",
});

const Row = styled(Flex)({
  flexDirection: "row",
});

const Center = styled(Flex)({
  justifyContent: "center",
  alignItems: "center",
});

const SizedBox = styled("div")<{
  width?: number | string;
  height?: number | string;
}>(({ width, height }) => ({
  width: width,
  height: height,
}));

export { Flex, Column, Row, Center, SizedBox };
