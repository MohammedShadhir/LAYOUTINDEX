import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { useParams, useNavigate } from "react-router-dom";

function EditLocation() {
  const { id } = useParams();
  const [location, setLocation] = useState({});
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  console.log(location.devices);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/locations/${id}`
        );
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/devices`
        );
        setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchLocation();
    fetchDevices();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
  };

  const handleDevicesChange = (e) => {
    const selectedDeviceIds = e.target.value;
    setLocation({
      ...location,
      devices: selectedDeviceIds,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/locations/${id}`,
        location
      );
      navigate("/location");
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        marginTop: "5%",
      }}
    >
      <h1>EDIT LOCATION</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              value={location.name || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              size="small"
              value={location.address || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Phone"
              variant="outlined"
              fullWidth
              size="small"
              value={location.phone || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="devices"
              label="Devices"
              variant="outlined"
              fullWidth
              size="small"
              select
              SelectProps={{
                multiple: true,
                value: location.devices || [],
                onChange: handleDevicesChange,
              }}
            >
              {devices.map((device) => (
                <MenuItem key={device._id} value={device._id}>
                  {device.serialNumber}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "100%" }}
            >
              UPDATE LOCATION
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default EditLocation;
