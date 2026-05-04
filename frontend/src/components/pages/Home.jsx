import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import API from "../../api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "16px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1
        style={{
          marginBottom: "20px",
          fontSize: "clamp(20px, 4vw, 32px)",
          textAlign: "center"
        }}
      >
        Best Deals on Amazon
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}
      >
        {products.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;