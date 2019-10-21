import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="root">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/products/:id" component={ProductDetail} />
      </Router>
    </div>
  );
};

export default App;
