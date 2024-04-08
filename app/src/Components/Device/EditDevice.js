import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

function EditDevice() {
  const { id } = useParams();
  const [device, setDevice] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevice();
    // eslint-disable-next-line
  }, []);

  const fetchDevice = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/devices/${id}`);
      setDevice(response.data);
    } catch (error) {
      console.error("Error fetching device:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevice({
      ...device,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", device.name);
      formData.append("serialNumber", device.serialNumber);
      formData.append("type", device.type);
      formData.append("status", device.status);
      if (imageFile) {
        formData.append("file", imageFile);
      }

      console.log(formData, imageFile, device);
      await axios.put(`http://localhost:4000/devices/${id}`, formData);

      navigate("/device");
    } catch (error) {
      console.error("Error updating device:", error);
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
      <h1>EDIT DEVICE</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              value={device.name || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="serialNumber"
              label="Serial Number"
              variant="outlined"
              fullWidth
              size="small"
              value={device.serialNumber || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="type"
              select
              label="Type"
              variant="outlined"
              fullWidth
              size="small"
              value={device.type || ""}
              onChange={handleChange}
            >
              <MenuItem value="pos">POS</MenuItem>
              <MenuItem value="kiosk">Kiosk</MenuItem>
              <MenuItem value="signage">Signage</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="status"
              select
              label="Status"
              variant="outlined"
              fullWidth
              size="small"
              value={device.status || ""}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "100%" }}
              onClick={handleSubmit}
            >
              Update Device
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default EditDevice;
