import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  useEffect(() => {
    const updateCart = () => {
      const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
      const currentUser = localStorage.getItem("user");
      const userCart = allCarts[currentUser] || [];
      setCart(userCart);
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

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
    <div style={{ backgroundColor: "#131921", color: "white" }}>
      
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <h2
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          amazon.in
        </h2>

        <input
          placeholder="Search Amazon.in"
          style={{
            flex: 1,
            minWidth: "180px",
            height: "20px",
            padding: "10px",
            borderRadius: "5px",
            border: "none"
          }}
        />

        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: "pointer", fontSize: "20px" }}
        >
          <FaBars />
        </div>
      </div>

      <div
        style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          gap: "15px",
          padding: "10px 16px",
          borderTop: "1px solid #333"
        }}
      >
        <div>
          <div style={{ fontSize: "12px" }}>
            Hello, {user || "User"}
          </div>
          <div style={{ fontWeight: "bold" }}>
            Account & Lists
          </div>
        </div>

        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Home
        </div>

        {user ? (
          <div onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </div>
        ) : (
          <div onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
            Login
          </div>
        )}

        <div onClick={() => navigate("/orders")} style={{ cursor: "pointer" }}>
          Orders
        </div>

        <div onClick={() => navigate("/wishlist")} style={{ cursor: "pointer" }}>
          ❤️ Wishlist
        </div>

        <div
          onClick={() => navigate("/checkout")}
          style={{ cursor: "pointer", display: "flex", gap: "5px" }}
        >
          <FaShoppingCart />
          Cart ({cart.length})
        </div>
      </div>
    </div>
  );
}

export default Navbar;