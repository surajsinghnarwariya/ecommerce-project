import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      style={{
        width: "100%",
        padding: "12px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <img
        src={`https://ecommerce-backend-f057.onrender.com${product.image}`}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h3
        style={{
          margin: "10px 0",
          fontSize: "clamp(14px, 2.5vw, 18px)",
          minHeight: "40px",
        }}
      >
        {product.name}
      </h3>

      <h2
        style={{
          color: "#B12704",
          margin: "5px 0",
          fontSize: "clamp(16px, 3vw, 20px)",
        }}
      >
        ₹{product.price}
      </h2>

      <Link
        to={`/product/${product._id}`}
        style={{
          background: "#FFD814",
          padding: "10px",
          display: "block",
          textAlign: "center",
          borderRadius: "5px",
          textDecoration: "none",
          color: "#000",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;