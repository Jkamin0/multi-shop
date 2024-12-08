import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItem component={Link} to="/">
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem component={Link} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem component={Link} to="/admin-products">
          <ListItemText primary="Admin Products" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navbar;
