import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Cart is empty</p>
      ) : (
        cart.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              background: "#fff",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <span style={{ flex: "1", minWidth: "150px" }}>
              {item.name}
            </span>

            <span style={{ fontWeight: "bold" }}>
              ₹{item.price}
            </span>

            <button
              onClick={() => removeItem(i)}
              style={{
                padding: "6px 12px",
                border: "none",
                background: "#ff4d4f",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <h2 style={{ textAlign: "right", marginTop: "20px" }}>
        Total: ₹{total}
      </h2>
    </div>
  );
}

export default Cart;