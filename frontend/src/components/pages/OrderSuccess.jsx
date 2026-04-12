import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: "40px",
      textAlign: "center"
    }}>
      <h1 style={{ color: "green" }}>✅ Order Placed Successfully</h1>
      
      <p style={{ marginTop: "10px" }}>
        Thank you for shopping with us!
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#131921",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}