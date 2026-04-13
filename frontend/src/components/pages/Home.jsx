import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import API from "../../api";

function Home() {
  const [products, setProducts] = useState([]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    API.get("/products")
      .then((res) => {
        console.log("DATA:", res.data); // 👈 add this
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1 style={{ marginBottom: "20px" }}>Best Deals on Amazon</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
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
