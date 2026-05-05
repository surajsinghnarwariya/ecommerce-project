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
    <div style={{ padding: "20px" }}>
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px"
          }}>
            <span>{item.name}</span>
            <span>₹{item.price}</span>
            <button onClick={() => removeItem(i)}>Remove</button>
          </div>
        ))
      )}

      <h2>Total: ₹{total}</h2>
    </div>
  );
}

export default Cart;