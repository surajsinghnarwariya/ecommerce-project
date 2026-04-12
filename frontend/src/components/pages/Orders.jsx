import React from "react";

export default function Orders() {
  const user = localStorage.getItem("user");

  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

  // ✅ user-wise filter
  const userOrders = allOrders.filter(order => order.user === user);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Orders 📦</h1>

      {userOrders.length === 0 && <p>No orders yet</p>}

      {userOrders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginTop: "15px",
            background: "#fff"
          }}
        >
          {/* ORDER HEADER */}
          <div style={{ marginBottom: "10px" }}>
            <h3>Order ID: {order.id}</h3>
            <p>Total: ₹{order.total}</p>
            <p style={{ fontSize: "12px", color: "gray" }}>
              {order.date}
            </p>
          </div>

          {/* ITEMS */}
          {order.items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "8px",
                borderTop: "1px solid #eee"
              }}
            >
              {item.name} - ₹{item.price}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}