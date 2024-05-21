import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Locations from "./Pages/Locations";
import Device from "./Pages/Device";
import EditLocation from "./Components/Locations/EditLocations";
import AddLocation from "./Components/Locations/AddLocation";
import AddDevice from "./Components/Device/AddDevice";
import EditDevice from "./Components/Device/EditDevice";
import dotenv from "dotenv";
dotenv.config();

function App() {
  const backendUrl = process.env.REACT_APP_API_URL;

  console.log("app console", backendUrl);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Locations />} />
        <Route path="/addlocation" element={<AddLocation />} />
        <Route path="/device" element={<Device />} />
        <Route path="/adddevice" element={<AddDevice />} />
        <Route path="/editdevice/:id" element={<EditDevice />} />
        <Route path="/editlocation/:id" element={<EditLocation />} />
      </Routes>
    </Layout>
  );
}

export default App;
