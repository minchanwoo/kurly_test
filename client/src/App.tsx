import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import MyPage from "./pages/MyPage";
import ProductQuestionEdit from "./pages/ProductDetail/ProductQuestionEdit";
import Test from "./pages/Test";
import OrderSheet from "./pages/OrderSheet";

import "./App.css";
import ProductReviewEdit from "./pages/ProductDetail/ProductReviewEdit";
import MyPageOrderList from "./pages/MyPage/MyPageOrderList";
import MyPageOrderDetail from "./pages/MyPage/MyPageOrderDetail";

const App: React.FC = () => {
  return (
    <div className="root">
      <Router>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/products/:id" exact component={ProductDetail} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/mypage/orders" exact component={MyPageOrderList} />
        <Route path="/mypage/orders/:id" component={MyPageOrderDetail} />
        <Route
          path="/products/:id/new_question"
          component={ProductQuestionEdit}
        />
        <Route path="/products/:id/new_review" component={ProductReviewEdit} />
        <Route path="/test" component={Test} />
        <Route path="/order_sheet/:id" component={OrderSheet} />
      </Router>
    </div>
  );
};

export default App;
