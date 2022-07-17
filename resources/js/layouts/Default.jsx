import React, { useState } from "react";

import { alpha, styled } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";

import { Person as PersonIcon, Menu as MenuIcon } from "@mui/icons-material";

import SideMenu from "../components/SideMenu";
import logo from "../../images/logo.jpg";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    zIndex: theme.zIndex.drawer - 1,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      boxShadow: "0 3px 12px rgba(208, 208, 208, 0.25)",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Default = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: (theme) => theme.palette.mode === "light" ? alpha(theme.palette.secondary.main, 0.025) : "#111"
      }}
    >
      <CssBaseline />
      <AppBar
        position="absolute"
        color="transparent"
        elevation={0}
        open={isDrawerOpen}
        sx={{ backgroundColor: "#fff" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon open/>
          </IconButton>

          <Typography
            variant="h5"
            fontWeight="500"
          >
            SAG Test
          </Typography>

          <Box sx={{ flexGrow: 1 }}/>

          <Avatar sx={{ bgcolor: (theme) => theme.palette.secondary.main, width: 32, height: 32, mr: 1 }}>
            <PersonIcon />
          </Avatar>
          <Typography
            variant="body2"
          >
            Joseph Mashauri
          </Typography>
        </Toolbar>
        <Divider />
      </AppBar>

      <Drawer
        variant="permanent"
        open={isDrawerOpen}
      >
        <Toolbar>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            width="40px"
            height="40px"
            mx="auto"
          />
        </Toolbar>
        <Divider />
        <SideMenu />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default Default;
