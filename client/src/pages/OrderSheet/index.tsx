import React, { useEffect, useState } from "react";
import Axios from "axios";
import Title from "../../components/Title";

import styles from "../../components/Table/index.module.css";
import Button from "../../components/Button";

const OrderSheet = (props: any) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:4000/order_sheets/${props.match.params.id}`, {
      withCredentials: true
    })
      .then(result => {
        const item_list = result.data.order.item_list.map((item: any) => {
          const product = result.data.products.find(
            (product: any) => product.id === item.productId
          );
          return {
            quantity: item.quantity,
            name: product.name,
            image_url: product.image_url,
            price: product.price
          };
        });
        setOrders(item_list);
      })
      .catch(e => {
        alert(e.response.data.errorMessage);
        props.history.push("/login");
      });
  }, []);

  return (
    <div>
      <Title title="주문내역" />
      <table className={styles.table} style={{ fontWeight: "bold" }}>
        <thead>
          <tr>
            <th>상품명</th>
            <th>상풍이미지</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(
            (
              order: {
                name: string;
                image_url: string;
                price: number;
                quantity: number;
              },
              i: number
            ) => {
              return (
                <tr key={i}>
                  <td>{order.name}</td>
                  <td>
                    <img src={order.image_url} alt="상품이미지" width={70} />
                  </td>
                  <td>{order.price.toLocaleString()}원</td>
                  <td>{order.quantity}개</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <div style={{ width: "100%", textAlign: "center", marginTop: "30px" }}>
        <Button
          text="결제하기"
          onButtonClick={async () => {
            try {
              await Axios.post(
                `http://localhost:4000/order_sheets/${props.match.params.id}`,
                {},
                { withCredentials: true }
              );
              props.history.push("/");
            } catch (e) {
              alert(e.response.data.errorMessage);
              props.history.push("/");
            }
          }}
        />
      </div>
    </div>
  );
};

export default OrderSheet;
