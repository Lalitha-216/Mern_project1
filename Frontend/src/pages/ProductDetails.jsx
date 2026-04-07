import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { getImageUrl } from "../api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product details");
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(i => i.productId === product._id);
    
    if (itemIndex > -1) {
      cart[itemIndex].qty += qty;
    } else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  if (error) return <div className="text-center mt-4">{error}</div>;
  if (!product) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", display: "flex", gap: "40px", flexWrap: "wrap", background: "var(--card-bg)", padding: "30px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
      <div style={{ flex: "1 1 400px" }}>
        <img src={getImageUrl(product.image)} alt={product.name} style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }} />
      </div>
      <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <span style={{ background: "rgba(59, 130, 246, 0.2)", color: "var(--primary-hover)", padding: "4px 10px", borderRadius: "20px", display: "inline-block", width: "fit-content", fontSize: "0.8rem", marginBottom: "10px" }}>
          {product.category}
        </span>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "15px" }}>{product.name}</h1>
        <p style={{ fontSize: "2rem", color: "var(--accent-color)", fontWeight: "bold", marginBottom: "20px" }}>₹{product.price}</p>
        <p style={{ color: "var(--text-light)", fontSize: "1.1rem", marginBottom: "30px", lineHeight: "1.8" }}>
          {product.description}
        </p>
        
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "8px", overflow: "hidden" }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: "12px 15px", background: "var(--bg-color)", border: "none", color: "white", cursor: "pointer", fontSize: "1.2rem" }}>-</button>
            <span style={{ padding: "0 20px", fontSize: "1.2rem" }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={{ padding: "12px 15px", background: "var(--bg-color)", border: "none", color: "white", cursor: "pointer", fontSize: "1.2rem" }}>+</button>
          </div>
          <button onClick={addToCart} className="btn" style={{ flex: 1, padding: "15px", fontSize: "1.1rem" }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
