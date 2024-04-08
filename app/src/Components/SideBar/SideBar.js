import React from "react";
import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";

const SideBar = () => {
  return (
    <Box display="flex" minHeight="100vh">
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Locations" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Devices" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
