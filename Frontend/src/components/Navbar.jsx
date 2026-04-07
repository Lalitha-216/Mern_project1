import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, User as UserIcon, Sun, Moon } from "lucide-react";

const Navbar = ({ theme, toggleTheme }) => {
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
        
        <button 
          onClick={toggleTheme} 
          style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-dark)", display: "flex", alignItems: "center", padding: "5px" }}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text-dark)", fontWeight: "600" }}>
              <UserIcon size={18} /> {user.name}
            </span>
            <button onClick={handleLogout} className="btn danger" style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: "5px" }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <div style={{ marginLeft: "10px", display: "flex", gap: "10px" }}>
            <Link to="/login" className="btn" style={{ padding: "8px 16px" }}>Login</Link>
            <Link to="/register" className="btn" style={{ background: "transparent", border: "2px solid var(--primary-color)", color: "var(--primary-color)", padding: "6px 16px" }}>Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
