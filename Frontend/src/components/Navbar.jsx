import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, User as UserIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">VendriX</Link>
      
      <nav className="nav-links">
        <Link to="/">Home</Link>
        {user?.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
        
        <Link to="/cart" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <ShoppingCart size={18} /> Cart
        </Link>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "20px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--accent-color)" }}>
              <UserIcon size={18} /> {user.name}
            </span>
            <button onClick={handleLogout} className="btn danger" style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: "5px" }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <div style={{ marginLeft: "20px", display: "flex", gap: "10px" }}>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn" style={{ background: "transparent", border: "1px solid var(--primary-color)" }}>Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
