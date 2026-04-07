import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center mb-4">Create an Account</h2>
      {error && <div style={{ color: "var(--danger-color)", marginBottom: "15px", textAlign: "center", background: "rgba(239, 68, 68, 0.1)", padding: "10px", borderRadius: "5px" }}>{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn" style={{ width: "100%" }}>Register</button>
      </form>
      <p className="text-center mt-4" style={{ color: "var(--text-light)" }}>
        Already have an account? <Link to="/login" style={{ color: "var(--primary-color)" }}>Login here</Link>
      </p>
    </div>
  );
};

export default Register;
