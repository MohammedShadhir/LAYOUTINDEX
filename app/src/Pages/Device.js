import React from "react";
import { Box } from "@mui/material";
import ReadDevice from "../Components/Device/ReadDevice";

const Device = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      minHeight="100vh"
      bgcolor="#cfd8dc"
    >
      <ReadDevice />
    </Box>
  );
};

export default Device;
