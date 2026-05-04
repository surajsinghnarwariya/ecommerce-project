import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import API from "../../api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const buyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  if (!product)
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading...
      </h2>
    );

  return (
    <div
      style={{
        display: "flex",
        padding: "16px",
        gap: "30px",
        flexWrap: "wrap",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <img
        src={
          product.image
            ? `https://ecommerce-backend-f057.onrender.com${product.image}`
            : "https://via.placeholder.com/300"
        }
        alt={product.name}
        style={{
          width: "100%",
          maxWidth: "320px",
          height: "auto",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      <div style={{ flex: "1", minWidth: "250px" }}>
        <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)" }}>
          {product.name}
        </h2>

        <h3
          style={{
            color: "#B12704",
            fontSize: "clamp(16px, 3vw, 22px)",
          }}
        >
          ₹{product.price}
        </h3>

        <p style={{ lineHeight: "1.5" }}>
          {product.description || "No description available"}
        </p>

        <button
          onClick={() => addToCart(product)}
          style={{
            width: "100%",
            maxWidth: "250px",
            padding: "10px",
            background: "#FFD814",
            border: "none",
            marginTop: "10px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={() => {
            const user = localStorage.getItem("user");

            if (!user) {
              alert("Please login first ❌");
              return;
            }

            const allWishlist =
              JSON.parse(localStorage.getItem("wishlist")) || {};

            if (!allWishlist[user]) {
              allWishlist[user] = [];
            }

            allWishlist[user].push(product);

            localStorage.setItem(
              "wishlist",
              JSON.stringify(allWishlist)
            );

            alert("Added to Wishlist ❤️");
          }}
          style={{
            width: "100%",
            maxWidth: "250px",
            marginTop: "10px",
            padding: "10px",
            background: "pink",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          ❤️ Wishlist
        </button>

        <button
          onClick={buyNow}
          style={{
            width: "100%",
            maxWidth: "250px",
            padding: "10px",
            background: "#FFA41C",
            border: "none",
            marginTop: "10px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}