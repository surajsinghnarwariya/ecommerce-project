import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import API from "../../api"; // ✅ important

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  // ✅ FETCH PRODUCT FROM BACKEND
  useEffect(() => {
    API.get("/products")
      .then((res) => {
        const found = res.data.find(
          (p) => String(p._id) === String(id)
        );
        setProduct(found);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // ✅ BUY NOW
  const buyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  // ✅ LOADING
  if (!product) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* IMAGE */}
      <img
        src={
          product.image
            ? `https://ecommerce-backend-f057.onrender.com${product.image}`
            : "https://via.placeholder.com/300"
        }
        alt={product.name}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      {/* DETAILS */}
      <div>
        <h2>{product.name}</h2>

        <h3 style={{ color: "#B12704" }}>
          ₹{product.price}
        </h3>

        <p>
          {product.description || "No description available"}
        </p>

        {/* ADD TO CART */}
        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "10px 20px",
            background: "#FFD814",
            border: "none",
            marginTop: "10px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Add to Cart
        </button>

        {/* WISHLIST */}
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
            marginTop: "10px",
            padding: "8px",
            background: "pink",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          ❤️ Wishlist
        </button>

        <br />

        {/* BUY NOW */}
        <button
          onClick={buyNow}
          style={{
            padding: "10px 20px",
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