import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));

  // ✅ LOGOUT FIX
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  // ✅ CART UPDATE
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

  // ✅ USER UPDATE
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
    <div style={{
      backgroundColor: "#131921",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      padding: "10px 20px"
    }}>

      {/* LOGO */}
      <h2 style={{ minWidth: "120px", cursor: "pointer" }} onClick={() => navigate("/")}>
        amazon.in
      </h2>

      {/* SEARCH */}
      <input
        placeholder="Search Amazon.in"
        style={{
          flex: 1,
          height: "20px",
          padding: "10px",
          borderRadius: "5px",
          border: "none"
        }}
      />

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

        {/* USER */}
        <div>
          <div style={{ fontSize: "12px" }}>
            Hello, {user || "User"}
          </div>
          <div style={{ fontWeight: "bold" }}>
            Account & Lists
          </div>
        </div>

        {/* HOME */}
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Home
        </div>

        {/* LOGIN / LOGOUT */}
        {user ? (
          <div onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </div>
        ) : (
          <div onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
            Login
          </div>
        )}

        {/* ORDERS */}
        <div onClick={() => navigate("/orders")} style={{ cursor: "pointer" }}>
          Orders
        </div>

        {/* WISHLIST */}
        <div onClick={() => navigate("/wishlist")} style={{ cursor: "pointer" }}>
          ❤️ Wishlist
        </div>

        {/* CART */}
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