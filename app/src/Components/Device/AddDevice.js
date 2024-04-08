import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";

function AddDevice() {
  const [device, setDevice] = useState({
    name: "",
    serialNumber: "",
    type: "",
    image: null,
    status: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    serialNumber: "",
    type: "",
    status: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevice({
      ...device,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!device.name) {
      newErrors.name = "Name is required";
      formIsValid = false;
    } else {
      newErrors.name = "";
    }

    if (!device.serialNumber) {
      newErrors.serialNumber = "Serial number is required";
      formIsValid = false;
    } else {
      newErrors.serialNumber = "";
    }

    if (!device.type) {
      newErrors.type = "Type is required";
      formIsValid = false;
    } else {
      newErrors.type = "";
    }

    if (!device.status) {
      newErrors.status = "Status is required";
      formIsValid = false;
    } else {
      newErrors.status = "";
    }

    if (!imageFile) {
      newErrors.image = "Image is required";
      formIsValid = false;
    } else {
      newErrors.image = "";
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        const formData = new FormData();
        formData.append("name", device.name);
        formData.append("serialNumber", device.serialNumber);
        formData.append("type", device.type);
        formData.append("status", device.status);
        if (imageFile) {
          formData.append("file", imageFile);
        }
        const response = await axios.post(
          `${process.env.BACKEND_URL}/devices/createdevice`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Device created:", response.data);
        navigate("/device");
      } catch (error) {
        console.error("Error adding device:", error);
      }
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
      <h1>ADD DEVICE</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              value={device.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="serialNumber"
              label="Serial Number"
              variant="outlined"
              fullWidth
              size="small"
              value={device.serialNumber}
              onChange={handleChange}
              error={!!errors.serialNumber}
              helperText={errors.serialNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={device.type}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.type}
              >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="pos">POS</MenuItem>
                <MenuItem value="kiosk">Kiosk</MenuItem>
                <MenuItem value="signage">Signage</MenuItem>
              </Select>
              {errors.type && (
                <FormHelperText error>{errors.type}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Input type="file" name="image" onChange={handleImageChange} />
            {errors.image && (
              <FormHelperText error>{errors.image}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={device.status}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.status}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
              {errors.status && (
                <FormHelperText error>{errors.status}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "100%" }}
            >
              ADD DEVICE
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default AddDevice;
