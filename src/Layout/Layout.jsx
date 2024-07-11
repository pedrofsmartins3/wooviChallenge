import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Box } from "@mui/material";

function Layout() {
  return (
    <body className="site-wrapper">
      <Header />
      <Box sx={{ fontFamily: "Nunito" }}>
        <Outlet />
      </Box>
      <Footer />
    </body>
  );
}

export default Layout;
