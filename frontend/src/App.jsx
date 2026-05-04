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
import API from "./api";

/* ---------------- HOME ---------------- */
function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ backgroundColor: "#EAEDED", minHeight: "100vh" }}>
      
      <div
        style={{
          height: "200px",
          background: "linear-gradient(to right, #ff9900, #ff6600)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(18px, 4vw, 28px)",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          padding: "10px"
        }}
      >
        Amazon Deals 🔥
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
          gap: "16px",
          padding: "16px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            style={{
              cursor: "pointer",
              background: "white",
              padding: "12px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                src={
                  p.image
                    ? `https://ecommerce-backend-f057.onrender.com${p.image}`
                    : "https://via.placeholder.com/200"
                }
                alt={p.name}
                style={{ maxHeight: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>

            <h4 style={{ fontSize: "clamp(14px,2.5vw,18px)" }}>{p.name}</h4>

            <p style={{ color: "#B12704", fontWeight: "bold" }}>
              ₹{p.price}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
              }}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#FFD814",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px"
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
    <CartProvider>
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