import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { useAuth } from "../context/AuthProvider";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setError("");
    const isSuccess = login(username, password);
    if (isSuccess) {
      setSuccess(true);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  if (isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Box textAlign="center" mt={4}>
          <Typography variant="h4" gutterBottom>
            Welcome, Admin!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        pt={8}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Logged in successfully!"
        />
      </Box>
    </Container>
  );
}
