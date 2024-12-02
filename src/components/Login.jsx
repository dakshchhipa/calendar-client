import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `https://calendar-server-3.onrender.com/api/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/user-dashboard");
    } catch (error) {
      alert("Error logging in: " + error.response.data.error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#121212", // Dark background
        color: "#ffffff", // White text
        padding: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          backgroundColor: "#333333", // Dark grey box for form
          borderRadius: "8px",
          padding: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 600,
            color: "#ffffff", // White color for the title
            marginBottom: 2,
          }}
        >
          LOGIN
        </Typography>

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          sx={{
            backgroundColor: "#444444",
            "& .MuiInputBase-root": {
              color: "#ffffff", // White text in input
            },
            "& .MuiInputLabel-root": {
              color: "#cccccc", // Light grey label
            },
            "&:hover .MuiOutlinedInput-root": {
              borderColor: "#ffffff", // White border on hover
            },
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          sx={{
            backgroundColor: "#444444",
            "& .MuiInputBase-root": {
              color: "#ffffff", // White text in input
            },
            "& .MuiInputLabel-root": {
              color: "#cccccc", // Light grey label
            },
            "&:hover .MuiOutlinedInput-root": {
              borderColor: "#ffffff", // White border on hover
            },
          }}
        />

        <Button
          variant="outlined" // Changed to outlined for white background
          fullWidth
          onClick={handleLogin}
          sx={{
            marginTop: 2,
            borderColor: "#ffffff", // White border
            color: "#ffffff", // White text color
            "&:hover": {
              backgroundColor: "#ffffff", // White background on hover
              color: "#121212", // Dark text color on hover
              borderColor: "#ff4b5c", // Red border on hover
            },
            transition: "transform 0.2s ease",
          }}
        >
          Login
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#cccccc", // Light grey color for the text
            }}
          >
            Are you an admin?
          </Typography>
          <Button
            onClick={() => navigate("/admin-login")}
            sx={{
              marginLeft: 1,
              borderColor: "#ffffff", // White border
              color: "#ffffff", // White text
              "&:hover": {
                backgroundColor: "#ffffff", // White background on hover
                color: "#121212", // Dark text color on hover
                borderColor: "#ff4b5c", // Red border on hover
              },
            }}
          >
            Admin Login
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#cccccc", // Light grey color for the text
            }}
          >
            Don't have an account?{" "}
          </Typography>
          <Button
            onClick={() => navigate("/register")}
            sx={{
              marginLeft: 1,
              borderColor: "#ffffff", // White border
              color: "#ffffff", // White text
              "&:hover": {
                backgroundColor: "#ffffff", // White background on hover
                color: "#121212", // Dark text color on hover
                borderColor: "#ff4b5c", // Red border on hover
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
