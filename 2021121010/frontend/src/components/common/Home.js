import { useState, useEffect } from "react";

const Home = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("Dass TAs");
  }, []);

  return <div style={{ textAlign: "center" }}>Happy Coding - {name}</div>;
};

export default Home;
