import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Auth0Provider from "./auth0-provider";
require("dotenv").config();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Auth0Provider>
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
