import React from "react";
import { useNavigate } from "react-router-dom";
import ComMang from "./ComMang";
import CommunicationMethodManagement from "./ComMan";
import { Button, Box } from "@mui/material";

const AdminDash = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div
      className="mt-5 ml-5"
      style={{
        backgroundColor: "#121212", // Black/grey background
        minHeight: "100vh",
        fontFamily: "Roboto, sans-serif",
        padding: "20px",
        color: "#ffffff", // Make all text white
      }}
    >
      {/* Logout Button */}
      <div className="flex w-fit ml-auto mr-4">
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#ff4b5c", // Red color for the logout button
            "&:hover": {
              backgroundColor: "#ff2a3a", // Darker red on hover
              transform: "scale(1.05)", // Smooth hover effect
            },
            transition: "transform 0.2s ease, background-color 0.3s ease",
            padding: "10px 20px",
            fontWeight: "bold",
            borderRadius: "5px",
            color: "#ffffff", // White text on button
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      {/* Dashboard Title */}
      <div
        className="text-4xl font-extrabold capitalize mx-auto w-fit"
        style={{
          color: "#ffffff", // Title is white
          textAlign: "center",
          marginBottom: "20px",
          textDecoration: "underline",
        }}
      >
        ADMIN DASHBOARD
      </div>

      {/* Components Section with Interactive Hover Effects */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#333333", // Dark grey background for each section
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)", // Shadow effect on hover
          },
        }}
      >
        {/* Section Header */}
        <div
          style={{
            color: "#ffffff", // White text for section headers
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Company Management
        </div>
        <ComMang />

        {/* Section Header */}
        <div
          style={{
            color: "#ffffff", // White text for section headers
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Communication Method Management
        </div>
        <CommunicationMethodManagement />
      </Box>
    </div>
  );
};

export default AdminDash;
