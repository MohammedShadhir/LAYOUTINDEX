import React from "react";
import { Box } from "@mui/material";

import ReadLocations from "../Components/Locations/ReadLocations";

const Locations = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      <ReadLocations />
    </Box>
  );
};

export default Locations;
