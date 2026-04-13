import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import { CartContext } from "../../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchData();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={`https://ecommerce-backend-f057.onrender.com${product.image}`}
        alt={product.name}
        style={{ width: "300px" }}
      />

      <h2>{product.name}</h2>
      <p style={{ color: "#B12704", fontWeight: "bold" }}>
        ₹{product.price}
      </p>

      <p>{product.description}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
        style={{
          width: "200px",
          padding: "10px",
          backgroundColor: "#FFD814",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}