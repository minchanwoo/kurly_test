import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Axios from "axios";
import _ from "lodash";
import moment from "moment";

import styles from "../../components/Table/index.module.css";
import { Link } from "react-router-dom";

const MyPageOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/orders/my", {
      withCredentials: true
    }).then(result => {
      const order_list = result.data.orders.map((order: any) => {
        const item_list = order.item_list.map((item: any) => {
          const product = result.data.product.find(
            (pro: any) => pro.id === item.productId
          );
          return {
            ...item,
            product
          };
        });
        return {
          ...order,
          item_list
        };
      });
      setOrders(order_list);
    });
  }, []);

  return (
    <div>
      <Title title="나의주문내역" />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>주문번호</th>
            <th>상품명</th>
            <th>상품합계금액</th>
            <th>수량</th>
            <th>주문일시</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => {
            return (
              <tr key={order.id}>
                <td>
                  <Link to={`/mypage/orders/${order.id}`}>{order.id}</Link>
                </td>
                <td>
                  {order.item_list.map((item: any, i: number) => {
                    return <div key={i}>{item.product.name}</div>;
                  })}
                </td>
                <td>
                  {_.sumBy(
                    order.item_list,
                    (item: any) => item.quantity * item.product.price
                  ).toLocaleString()}
                  원
                </td>
                <td>{_.sumBy(order.item_list, "quantity")}개</td>
                <td>{moment(order.createdAt).format("YY/MM/DD hh:mm")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyPageOrderList;
