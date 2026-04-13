import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ p }) {
  return (
    <div className="product-card">
      <Link to={`/product/${p._id}`}>
        <img src={`https://ecommerce-backend-f057.onrender.com${p.image}`} alt={p.name} style={{width:200}} />
        <h3>{p.name}</h3>
        <p>₹{p.price}</p>
      </Link>
    </div>
  );
}