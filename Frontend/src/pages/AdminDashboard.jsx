import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Package } from "lucide-react";
import api from "../api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  
  const [formData, setFormData] = useState({
    name: "", price: "", category: "Electronics", description: "", image: ""
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchProducts();
    fetchOrders();
  }, [navigate]);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/all");
      setOrders(res.data);
    } catch (err) {
      console.log("Error loading orders", err);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Error deleting product");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/add", formData);
      alert("Product added!");
      setFormData({ name: "", price: "", category: "Electronics", description: "", image: "" });
      fetchProducts();
    } catch (err) {
      alert("Error adding product");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2>Admin Dashboard</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            className={`btn ${activeTab === "products" ? "" : "danger"}`} 
            style={activeTab !== "products" ? { background: "var(--card-bg)" } : {}}
            onClick={() => setActiveTab("products")}
          >Products</button>
          <button 
            className={`btn ${activeTab === "orders" ? "" : "danger"}`}
            style={activeTab !== "orders" ? { background: "var(--card-bg)" } : {}}
            onClick={() => setActiveTab("orders")}
          >Orders</button>
        </div>
      </div>

      {activeTab === "products" && (
        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
          <div className="form-container" style={{ margin: "0", flex: "1 1 400px" }}>
            <h3 className="mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                </select>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
              </div>
              <button type="submit" className="btn" style={{ width: "100%" }}>Add Product</button>
            </form>
          </div>

          <div style={{ flex: "2 1 600px", background: "var(--card-bg)", padding: "30px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <h3 className="mb-4">Manage Products</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <th style={{ padding: "15px" }}>Product</th>
                    <th style={{ padding: "15px" }}>Price</th>
                    <th style={{ padding: "15px" }}>Category</th>
                    <th style={{ padding: "15px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "15px", display: "flex", gap: "10px", alignItems: "center" }}>
                        <img src={p.image} alt={p.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                        {p.name}
                      </td>
                      <td style={{ padding: "15px" }}>₹{p.price}</td>
                      <td style={{ padding: "15px" }}>{p.category}</td>
                      <td style={{ padding: "15px" }}>
                        <button onClick={() => handleDelete(p._id)} style={{ background: "none", border: "none", color: "var(--danger-color)", cursor: "pointer" }}>
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div style={{ background: "var(--card-bg)", padding: "30px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          <h3 className="mb-4">All Orders</h3>
          {orders.length === 0 ? <p>No orders found.</p> : (
            orders.map(order => (
              <div key={order._id} style={{ marginBottom: "20px", padding: "20px", border: "1px solid var(--border-color)", borderRadius: "8px", background: "var(--bg-color)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                  <span style={{ color: "var(--text-light)" }}>Order ID: {order._id}</span>
                  <span style={{ color: "var(--accent-color)", fontWeight: "bold" }}>Total: ₹{order.total}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Package size={16} color="var(--primary-color)" />
                      <span>{item.name}</span>
                      <span style={{ color: "var(--text-light)" }}>({item.qty} × ₹{item.price})</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
