import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img
          src={`https://ecommerce-backend-f057.onrender.com${product.image}`}
          alt={product.name}
          style={{ width: 200 }}
        />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
      </Link>
    </div>
  );
}