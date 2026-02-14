import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            Task & Team Management
          </Typography>

          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ bgcolor: "white", color: "black" }}>
              {user?.name?.slice(0, 2).toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem disabled>
              {user?.name}
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                handleMenuClose();
                handleLogout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton onClick={() => navigate("/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          {user?.role === "admin" && (
            <ListItemButton onClick={() => navigate("/dashboard/teams")}>
              <ListItemText primary="Team Management" />
            </ListItemButton>
          )}

          <ListItemButton onClick={() => navigate("/dashboard/tasks")}>
            <ListItemText primary="Task List" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/dashboard/create-task")}>
            <ListItemText primary="Create Task" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
