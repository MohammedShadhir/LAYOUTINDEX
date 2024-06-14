import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, Box, TextField } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    auth0Id: "",
  });

  console.log("hello user", user);
  useEffect(() => {
    if (user) {
      setFormData({ ...formData, auth0Id: user.sub });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post(
        "http://localhost:4000/users",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from backend:", response.data);
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        auth0Id: user.sub,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6">Add User</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="dob"
              label="Date of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.dob}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Home;
