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
        const data = res.data;
        setProduct(data.product || data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const buyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <h3>₹{product.price}</h3>

      <button
        onClick={() => addToCart(product)}
        style={{
          padding: "10px",
          marginTop: "10px",
          background: "#FFD814",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        Add to Cart
      </button>

      <br />

      <button
        onClick={buyNow}
        style={{
          padding: "10px",
          marginTop: "10px",
          background: "#FFA41C",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        Buy Now
      </button>
    </div>
  );
}