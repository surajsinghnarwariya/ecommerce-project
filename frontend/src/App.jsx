import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import ProductDetails from "./components/pages/ProductDetails";
import Login from "./components/pages/Login";
import Navbar from "./components/Navbar";
import Checkout from "./components/pages/Checkout";
import OrderSuccess from "./components/pages/OrderSuccess";
import Orders from "./components/pages/Orders";
import Wishlist from "./components/pages/Wishlist";
import { CartProvider, CartContext } from "./context/CartContext";

/* ---------------- HOME ---------------- */
function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext); // ✅ सही use

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() =>
        setProducts([
          { _id: 1, name: "T-Shirt", price: 499 },
          { _id: 2, name: "Shoes", price: 999 },
          { _id: 3, name: "Headphones", price: 1999 }
        ])
      );
  }, []);

  return (
    <div style={{ backgroundColor: "#EAEDED", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{
        height: "250px",
        background: "linear-gradient(to right, #ff9900, #ff6600)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
        color: "white",
        fontWeight: "bold"
      }}>
        Amazon Deals 🔥
      </div>

      {/* PRODUCTS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
        gap: "20px",
        padding: "20px"
      }}>
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            style={{
              cursor: "pointer",
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            <div style={{ height: "150px", display: "flex", justifyContent: "center" }}>
              <img
                src={p.image ? `http://localhost:5000${p.image}` : "https://via.placeholder.com/200"}
                style={{ maxHeight: "100%" }}
              />
            </div>

            <h4>{p.name}</h4>
            <p style={{ color: "#B12704", fontWeight: "bold" }}>₹{p.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p); // ✅ FIXED
              }}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#FFD814",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- APP ---------------- */
function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    const updateUser = () => {
      setUser(localStorage.getItem("user"));
    };

    window.addEventListener("authChanged", updateUser);

    return () => {
      window.removeEventListener("authChanged", updateUser);
    };
  }, []);

  return (
    <CartProvider> {/* ✅ MUST */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;