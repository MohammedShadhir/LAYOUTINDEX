import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

function AddLocation() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    devices: [],
  });

  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchDevices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleDevicesChange = (e) => {
    const selectedDeviceIds = e.target.value;
    setFormData({
      ...formData,
      devices: selectedDeviceIds,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/locations/addlocation`,
        formData
      );
      navigate("/location");
    } catch (error) {
      console.error("Error adding location:", error);
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
      <h1>ADD LOCATION</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.name}
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
              value={formData.address}
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
              value={formData.phone}
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
                value: formData.devices || [],
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
              ADD LOCATION
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default AddLocation;
