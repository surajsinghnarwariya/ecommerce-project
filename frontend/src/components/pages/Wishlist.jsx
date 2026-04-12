import React from "react";

export default function Wishlist() {
  const user = localStorage.getItem("user");
  const allWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
  const items = allWishlist[user] || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Wishlist ❤️</h1>

      {items.length === 0 && <p>No items in wishlist</p>}

      {items.map((item, i) => (
        <div key={i}>
          {item.name} - ₹{item.price}
        </div>
      ))}
    </div>
  );
}