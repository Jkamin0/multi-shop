import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const success = login(username, password);
    if (success) {
      alert("Logged in successfully!");
    } else {
      alert("Invalid credentials.");
    }
  };

  if (isAuthenticated) {
    return <div>Welcome, Admin!</div>;
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
