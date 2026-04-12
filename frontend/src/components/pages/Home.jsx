import ProductCard from "../ProductCard";

function Home() {

  // first file ka data
  const products1 = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1499,
      image: "https://via.placeholder.com/400x400",
    },
    {
      id: 2,
      name: "Sports Shoes",
      price: 999,
      image: "https://via.placeholder.com/400x400",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 1999,
      image: "https://via.placeholder.com/400x400",
    },
    {
      id: 4,
      name: "T-Shirt",
      price: 499,
      image: "https://via.placeholder.com/400x400",
    },
  ];

  // second file ka data
  const products2 = [
    { id: 5, name: "T-Shirt", price: 499 },
    { id: 6, name: "Shoes", price: 999 },
    { id: 7, name: "Headphones", price: 1999 }
  ];

  return (
    <div style={{ padding: "20px" }}>

      {/* first UI */}
      <h1 style={{ marginBottom: "20px" }}>Best Deals on Amazon</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >
        {products1.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {/* second UI */}
      <h1>Products</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        {products2.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </div>
  );
}

export default Home;