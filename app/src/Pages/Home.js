import React from "react";
import { Typography, Button, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <Typography variant="h6">Please log in to see your profile.</Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10%",
        height: "100vh",
      }}
    >
      <Typography variant="h1" gutterBottom>
        Welcome to Location Manager
      </Typography>
      <Typography variant="h4" gutterBottom>
        Manage your locations and devices efficiently.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/adddevice"
            sx={{ width: 200 }}
          >
            Add Device
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/addlocation"
            sx={{ width: 200 }}
          >
            Add Location
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
