import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import api from "../api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const removeItem = (productId) => {
    const updated = cartItems.filter(item => item.productId !== productId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = async () => {
    const user = localStorage.getItem("token");
    if (!user) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    setPlacingOrder(true);
    try {
      const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      await api.post("/orders/place", {
        items: cartItems.map(i => ({ productId: i.productId, name: i.name, price: i.price, qty: i.qty })),
        total
      });
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch(err) {
      alert("Failed to place order: " + (err.response?.data?.message || err.message));
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center" style={{ marginTop: "100px" }}>
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn mt-4">Continue Shopping</Link>
      </div>
    );
  }

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2 style={{ marginBottom: "30px", borderBottom: "1px solid var(--border-color)", paddingBottom: "15px" }}>Shopping Cart</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cartItems.map((item) => (
          <div key={item.productId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--card-bg)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img src={item.image} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
              <div>
                <h4 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>{item.name}</h4>
                <p style={{ color: "var(--text-light)" }}>Qty: {item.qty} × ₹{item.price}</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: "bold", color: "var(--accent-color)" }}>₹{item.price * item.qty}</span>
              <button onClick={() => removeItem(item.productId)} style={{ background: "transparent", border: "none", color: "var(--danger-color)", cursor: "pointer" }}>
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px", padding: "30px", background: "var(--card-bg)", borderRadius: "12px", textAlign: "right", border: "1px solid var(--border-color)" }}>
        <p style={{ fontSize: "1.2rem", marginBottom: "15px", color: "var(--text-light)" }}>Total Amount:</p>
        <h2 style={{ fontSize: "2.5rem", color: "white", marginBottom: "30px" }}>₹{total}</h2>
        <button onClick={handleCheckout} disabled={placingOrder} className="btn" style={{ padding: "15px 40px", fontSize: "1.2rem" }}>
          {placingOrder ? "Processing..." : "Checkout Now"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
