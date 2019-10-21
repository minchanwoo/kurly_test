import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/products").then(result => {
      setProducts(result.data.products);
    });
  }, []);
  return (
    <div>
      <Header />
      <img
        src="http://img-cf.kurly.com/shop/data/main/1/pc_img_1571045589.jpg"
        alt="메인이미지"
      />
      {products.map((product: any) => {
        return (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.image_url} alt="상품이미지" />
              <div>{product.name}</div>
              <div>{product.price.toLocaleString()}원</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
