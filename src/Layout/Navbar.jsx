import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"
export default function Navbar() {
  const buttonTheme = {
    fontWeight: "600",
    background: "#FF6624",
    ":hover": {
      background: "#e55b20",
    },
  };

  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ background: "#FFFFFF" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
          sx={buttonTheme}
        >
          Home
        </Button>
        <div className="btn-container">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/login");
            }}
            sx={buttonTheme}
          >
            Login
          </Button>
          <Button
           variant="contained"
           onClick={() => {
             navigate("/register");
           }}
           sx={buttonTheme}
          >Register</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
