import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import RecipeReviewCard from "./Card";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function ReadDevice() {
  const { getAccessTokenSilently } = useAuth0();
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDevices = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/devices`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDevices(response.data);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const deleteDevice = async (deviceId) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/devices/${deviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDevices(devices.filter((device) => device._id !== deviceId));
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const editDevice = (deviceId) => {
    navigate(`/editdevice/${deviceId}`);
    console.log("Edit device with ID:", deviceId);
  };

  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    <Typography>Please login</Typography>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          color: "#2196f3",
          width: "90%",
          p: 2,
        }}
      >
        <h1>DEVICES</h1>
        <Link
          to="/adddevice"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h1>ADD</h1>
        </Link>
      </Box>

      <Grid container spacing={2} sx={{ width: "100%", p: 2 }}>
        {devices.map((device, index) => (
          <Grid item xs={12} sm={4} md={4} lg={3} key={index}>
            <RecipeReviewCard
              avatarLetter="D"
              name={device.name}
              serialNumber={device.serialNumber}
              type={device.type}
              imageUrl={device.image}
              status={device.status}
              onDelete={() => deleteDevice(device._id)}
              onEdit={() => editDevice(device._id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ReadDevice;
