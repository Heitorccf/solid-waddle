// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Receivables from "./pages/Receivables";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/receivables" /> : <Login />}
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/receivables" /> : <Register />
          }
        />
        <Route
          path="/receivables"
          element={
            <PrivateRoute>
              <Receivables />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/receivables" />} />
      </Routes>
    </div>
  );
};

export default App;
