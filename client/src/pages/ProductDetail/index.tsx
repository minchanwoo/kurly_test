import React, { useEffect, useState } from "react";

import axios from "axios";

import ProductQuestionList from "./ProductQuestionList";
import ProductReviewList from "./ProductReviewList";

import styles from "./index.module.css";
import Title from "../../components/Title";

interface IProduct {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

enum ProductDetailTab {
  introduce = "introduce",
  image = "image",
  detail_intro = "detail_intro",
  customers = "customers",
  ask_product = "ask_product"
}

const ProductDetail = (props: any) => {
  const [product, setProduct] = useState({} as IProduct);
  const [productQuestion, setProductQuestion] = useState([]);

  const [select, setSelect] = useState(ProductDetailTab.introduce);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${props.match.params.id}`)
      .then(result => {
        setProduct(result.data.products);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/product_questions?productId=${props.match.params.id}`,
        {
          withCredentials: true
        }
      )
      .then(result => {
        const question = result.data.result.map((p: any) => {
          return { ...p, open: false };
        });
        setProductQuestion(question);
      });
  }, []);

  const selectedBtn = (tab: ProductDetailTab, label: string) => {
    return (
      <li
        className={select === tab ? styles.selectedTab : ""}
        onClick={() => setSelect(tab)}
      >
        {label}
      </li>
    );
  };

  return (
    <div className={styles.detail_list}>
      <div>{product.name}</div>
      <div>{(product.price || 0).toLocaleString()}원</div>
      <div>
        <img src={product.image_url} width={150} />
      </div>
      <div className={styles.tabs}>
        <ul>
          {selectedBtn(ProductDetailTab.introduce, "상품설명")}
          {selectedBtn(ProductDetailTab.image, "상품이미지")}
          {selectedBtn(ProductDetailTab.detail_intro, "상세정보")}
          {selectedBtn(ProductDetailTab.customers, "고객후기")}
          {selectedBtn(ProductDetailTab.ask_product, "상품문의")}
        </ul>
      </div>

      {select === ProductDetailTab.introduce && <Title title="상품설명" />}
      {select === ProductDetailTab.image && <Title title="상품이미지" />}
      {select === ProductDetailTab.detail_intro && <Title title="상세정보" />}
      {select === ProductDetailTab.customers && (
        <ProductReviewList product_id={product.id} />
      )}
      {select === ProductDetailTab.ask_product && (
        <ProductQuestionList
          product_id={product.id}
          productQuestion={productQuestion}
          setProductQuestion={setProductQuestion}
        />
      )}
    </div>
  );
};

export default ProductDetail;
