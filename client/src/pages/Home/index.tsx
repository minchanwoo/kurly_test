import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./index.module.css";
import { getCartCountAsync } from "../../reducers/cart";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/products").then(result => {
      setProducts(result.data.products);
    });
  }, []);
  return (
    <div className={styles.root}>
      <img
        src="http://img-cf.kurly.com/shop/data/main/1/pc_img_1573609936.jpg"
        alt="메인이미지"
        className={styles.main_image}
      />
      <div className={styles.products}>
        {products.map((product: any) => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`} className={styles.tags}>
                <img src={product.image_url} alt="상품이미지" width={150} />
                <div>{product.name}</div>
                <div>{product.price.toLocaleString()}원</div>
              </Link>
              <button
                onClick={async e => {
                  e.preventDefault();
                  const result = await axios.post(
                    "http://localhost:4000/carts/add",
                    { quantity: 1, productId: product.id },
                    { withCredentials: true }
                  );
                  getCartCountAsync(dispatch);
                  console.log("INCREASE~!!", result);
                }}
              >
                +
              </button>
              <button
                onClick={async e => {
                  e.preventDefault();
                  try {
                    const result = await axios.post(
                      "http://localhost:4000/carts/add",
                      { quantity: -1, productId: product.id },
                      { withCredentials: true }
                    );
                    getCartCountAsync(dispatch);
                  } catch (e) {
                    console.log("에러메세지~!", e.response.data.errorMessage);
                  }
                }}
              >
                -
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
