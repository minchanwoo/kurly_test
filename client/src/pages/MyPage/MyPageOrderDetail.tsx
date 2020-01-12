import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Axios from "axios";

import styles from "../../components/Table/index.module.css";
import Button from "../../components/Button";

const MyPageOrderDetail = (props: any) => {
  const [myProduct, setMyProduct] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:4000/orders/${props.match.params.id}`, {
      withCredentials: true
    }).then(result => {
      const item_list = result.data.order.item_list.map((item: any) => {
        const product = result.data.products.find(
          (pro: any) => pro.id === item.productId
        );
        return {
          product_id: product.id,
          product_name: product.name,
          product_image: product.image_url,
          product_price: product.price,
          product_quantity: item.quantity
        };
      });
      setMyProduct(item_list);
    });
  }, []);

  return (
    <div>
      <Title title="나의 상세 주문내역" />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>주문번호</th>
            <th>상품이름</th>
            <th>상품이미지</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {myProduct.map((p: any) => {
            return (
              <tr key={p.product_id}>
                <td>{props.match.params.id}</td>
                <td>{p.product_name}</td>
                <td>
                  <img src={p.product_image} alt="상품이미지" width={70} />
                </td>
                <td>{p.product_price.toLocaleString()}원</td>
                <td>{p.product_quantity}개</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          margin: "30px 0 150px -150px",
          width: "100%",
          textAlign: "right"
        }}
      >
        <Button
          text="뒤로가기"
          onButtonClick={() => props.history.push("/mypage/orders")}
        />
      </div>
    </div>
  );
};

export default MyPageOrderDetail;
