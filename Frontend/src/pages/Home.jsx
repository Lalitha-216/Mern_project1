import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      let query = "?";
      if (search) query += `search=${search}&`;
      if (category) query += `category=${category}`;
      
      const res = await api.get(`/products${query}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to default fetch products", err);
    }
  };

  return (
    <div>
      <section style={{ textAlign: "center", padding: "60px 0", borderBottom: "1px solid var(--border-color)" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "15px" }}>Discover Amazing Products</h1>
        <p style={{ color: "var(--text-light)", fontSize: "1.2rem", marginBottom: "30px" }}>Shop smart. Shop fast. Shop better.</p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", maxWidth: "600px", margin: "0 auto" }}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "white" }}
          />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "white" }}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select>
        </div>
      </section>

      <div className="grid">
        {products.map(p => (
          <div key={p._id} className="card">
            <img src={p.image} alt={p.name} className="card-img" />
            <div className="card-body">
              <h3 style={{ marginBottom: "10px" }}>{p.name}</h3>
              <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "15px", minHeight: "40px" }}>
                {p.description?.substring(0, 60)}...
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--accent-color)" }}>₹{p.price}</span>
                <Link to={`/product/${p._id}`} className="btn" style={{ padding: "8px 16px" }}>View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px", color: "var(--text-light)" }}>
          No products found.
        </div>
      )}
    </div>
  );
};

export default Home;
