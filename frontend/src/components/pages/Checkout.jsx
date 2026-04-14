import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, removeFromCart, decreaseQty, addToCart } = useContext(CartContext);

  const user = localStorage.getItem("user");

  // ================= PAYMENT =================
  const handlePayment = async () => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded ❌");
        return;
      }

      if (!user) {
        alert("Please login first ❌");
        return;
      }

      if (cart.length === 0) {
        alert("Cart is empty ❌");
        return;
      }

      const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        5000
      );

      const res = await fetch("https://ecommerce-backend-f057.onrender.com/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_SdMo25wwjUBS4u", 
        amount: order.amount,
        currency: "INR",
        name: "Amazon Clone",
        description: "Test Payment",
        order_id: order.id,

        handler: function () {
          alert("Payment Successful ✅");
          placeOrder();
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      alert("Payment Failed ❌");
    }
  };

  // ================= PLACE ORDER =================
  const placeOrder = () => {
    const newOrder = {
      id: Date.now(),
      user,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      ),
      date: new Date().toLocaleString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    // CLEAR CART
    const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
    allCarts[user] = [];
    localStorage.setItem("carts", JSON.stringify(allCarts));

    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/success");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart Page 🛒</h1>

      {cart.length === 0 && <p>No items</p>}

      {cart.map((item, index) => (
        <div
          key={index}
          style={{
            background: "#f5f5f5",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {item.name} - ₹{item.price}
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button onClick={() => decreaseQty(index)}>-</button>

            <span>{item.qty}</span>

            <button onClick={() => addToCart(item)}>+</button>

            <button
              onClick={() => removeFromCart(index)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <h2>
        Total: ₹
        {cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
      </h2>

      {/* PAYMENT BUTTON */}
      <button
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Pay Now 💳
      </button>
    </div>
  );
}