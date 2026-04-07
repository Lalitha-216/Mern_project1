import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center mb-4">Welcome Back</h2>
      {error && <div style={{ color: "var(--danger-color)", marginBottom: "15px", textAlign: "center", background: "rgba(239, 68, 68, 0.1)", padding: "10px", borderRadius: "5px" }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn" style={{ width: "100%" }}>Login</button>
      </form>
      <p className="text-center mt-4" style={{ color: "var(--text-light)" }}>
        Don't have an account? <Link to="/register" style={{ color: "var(--primary-color)" }}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;
