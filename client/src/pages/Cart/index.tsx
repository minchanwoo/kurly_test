import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./index.module.css";
import Counter from "../../components/Counter";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import Title from "../../components/Title";

const Cart = (props: any) => {
  const [carts, setCarts] = useState([]);
  const [cartsPriceSum, setCartsPriceSum] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:4000/carts/my", { withCredentials: true })
      .then(result => {
        const data = result.data.carts.map((cart: any) => ({
          ...cart,
          selected: false
        }));
        setCarts(data);
      })
      .catch(e => {
        alert(e.response.data.errorMessage);
        props.history.push("/");
      });
  }, []);

  useEffect(() => {
    let checked_count = 0;
    let sum = 0;
    carts.forEach((cart: any) => {
      if (cart.selected) {
        sum += cart.product.price * cart.quantity;
        checked_count += 1;
      }
    });
    setCheckedCount(checked_count);
    setAllChecked(checked_count === carts.length);
    setCartsPriceSum(sum);
  }, [carts]);

  return (
    <div className={styles.cartPage}>
      <Title title="장바구니" />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={allChecked}
                onChange={() => {
                  const new_carts = [...carts];
                  new_carts.forEach((cart: any) => {
                    cart.selected = !allChecked;
                  });
                  setCarts(new_carts);
                }}
              />
              <span className={styles.allCheckCounter}>
                전체선택 {checkedCount} / {carts.length}
              </span>
            </th>
            <th>상품이름</th>
            <th>상품이미지</th>
            <th>수량</th>
            <th>상품금액</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {carts.map(
            (cart: {
              id: number;
              quantity: number;
              product: { name: string; price: number; image_url: string };
              selected: boolean;
            }) => {
              return (
                <tr key={cart.id}>
                  <td>
                    <Checkbox
                      checked={cart.selected}
                      onChange={() => {
                        const newCarts = [...carts];
                        newCarts.forEach((c: any) => {
                          if (c.id === cart.id) {
                            c.selected = !c.selected;
                          }
                        });
                        setCarts(newCarts);
                      }}
                    />
                  </td>
                  <td>{cart.product.name}</td>
                  <td>
                    <img src={cart.product.image_url} width={55} />
                  </td>
                  <td>
                    <Counter
                      value={cart.quantity}
                      setValue={(value: any) => {
                        const carts_new = [...carts];
                        carts_new.forEach((c: any) => {
                          if (c.id === cart.id) {
                            c.quantity = value;
                          }
                        });
                        setCarts(carts_new);
                      }}
                    />
                  </td>
                  <td>
                    {(cart.product.price * cart.quantity).toLocaleString()}원
                  </td>
                  <td
                    onClick={async () => {
                      try {
                        if (
                          window.confirm("정말로 이상품을 제외하시겠습니까?")
                        ) {
                          const result = await axios.delete(
                            `http://localhost:4000/carts/${cart.id}`,
                            {
                              withCredentials: true
                            }
                          );
                          if (result.data.success === true) {
                            const carts_new = carts.filter(
                              (c: any) => c.id !== cart.id
                            );
                            setCarts(carts_new);
                          }
                        }
                      } catch (e) {
                        console.log("ERROR~@@", e);
                      }
                    }}
                  >
                    <img
                      src="https://res.kurly.com/pc/ico/1801/btn_close_24x24_514859.png"
                      width={12}
                      height={12}
                    />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <div className={styles.total_price_container}>
        <div className={styles.total_price}>
          총{cartsPriceSum.toLocaleString()}원
        </div>
      </div>
      <div className={styles.order_btn}>
        <Button
          text="주문하기"
          onButtonClick={async () => {
            if (!checkedCount) {
              alert("1개 이상의 상품을 선택해주세요");
            } else {
              const item_list = carts
                .filter((c: any) => c.selected === true)
                .map((c: any) => {
                  return {
                    productId: c.product.id,
                    quantity: c.quantity
                  };
                });
              const created = await axios.post(
                "http://localhost:4000/order_sheets",
                { item_list },
                { withCredentials: true }
              );
              props.history.push(`/order_sheet/${created.data.result.id}`);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Cart;
