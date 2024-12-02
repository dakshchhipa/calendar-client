import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDash from "./components/AdminDash";
import UserDashboard from "./components/UserDash";
import ProtectedRoute from "./components/ProtRou";
import Register from "./components/Register";
import LoginAdmin from "./components/LoginAdmin";

const App = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-login" element={<LoginAdmin />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDash />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
