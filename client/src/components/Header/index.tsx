import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn } from "../../reducers/user";
import { getCartCountAsync } from "../../reducers/cart";

const Header = (props: any) => {
  const nick = useSelector((state: any) => state.nick);
  const cart_count = useSelector((state: any) => state.cart_count);
  const dispatch = useDispatch();

  useEffect(() => {
    getCartCountAsync(dispatch);
    axios
      .get("http://localhost:4000/users/logged_in_account", {
        withCredentials: true
      })
      .then(result => {
        if (result.data && result.data.nick) {
          setLoggedIn(result.data.nick, dispatch);
        }
      });
  }, []);

  const logout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      await axios.post(
        "http://localhost:4000/users/logout",
        {},
        { withCredentials: true }
      );
      alert("로그아웃이 정상적으로 완료되었습니다");
      await setLoggedIn("", dispatch);
      await getCartCountAsync(dispatch);
      props.history.push("/login");
    }
  };

  return (
    <div className={styles.header}>
      {nick ? (
        <div className={styles.header_links}>
          <Link to="/mypage" className={styles.signup}>
            {nick}님 환영합니다
          </Link>
          <span style={{ cursor: "pointer" }} onClick={() => logout()}>
            로그아웃
          </span>
        </div>
      ) : (
        <div className={styles.header_links}>
          <Link to="/signup" className={styles.signup}>
            회원가입
          </Link>
          <Link to="/login">로그인</Link>
        </div>
      )}
      <Link to="/">
        <img
          src="https://res.kurly.com/images/marketkurly/logo/logo_x2.png"
          alt="메인로고"
          className={styles.header_logo}
        />
      </Link>
      <div className={styles.header_menues}>
        <div className={styles.header_menu_gnb}>
          <img
            src="https://res.kurly.com/pc/service/common/1908/ico_gnb_all_off_x2.png"
            alt="햄버거바"
          />
          전체 카테고리
        </div>
        <div className={styles.header_menu}>신상품</div>
        <div className={styles.header_menu}>베스트</div>
        <div className={styles.header_menu}>알뜰쇼핑</div>
        <div className={styles.header_menu}>이벤트</div>
        <input
          type="text"
          placeholder="어메이징 Price"
          className={styles.header_search}
        />
        <div className={styles.cart_container}>
          <Link to="/cart">
            <img
              src="https://res.kurly.com/pc/ico/1908/ico_cart_x2_v2.png"
              alt="장바구니아이콘"
              className={styles.header_cart}
            />
          </Link>
          {cart_count !== 0 && (
            <div className={styles.cart_count}>{cart_count}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
