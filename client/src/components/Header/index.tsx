import React from "react";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://res.kurly.com/images/marketkurly/logo/logo_x2.png"
        alt="메인로고"
        className="header_logo"
      />
      <div className="header_menues">
        <div className="header_menu_gnb">
          <img
            src="https://res.kurly.com/pc/service/common/1908/ico_gnb_all_off_x2.png"
            alt="햄버거바"
          />
          전체 카테고리
        </div>
        <div className="header_menu">신상품</div>
        <div className="header_menu">베스트</div>
        <div className="header_menu">알뜰쇼핑</div>
        <div className="header_menu">이벤트</div>
        <input
          type="text"
          placeholder="어메이징 Price"
          className="header_search"
        />
        <img
          src="https://res.kurly.com/pc/ico/1908/ico_cart_x2_v2.png"
          alt="장바구니아이콘"
          className="header_cart"
        />
      </div>
    </div>
  );
};

export default Header;
