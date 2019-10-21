import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";

const ProductDetail = (props: any) => {
  const [product, setProduct] = useState({} as any);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${props.match.params.id}`)
      .then(result => {
        setProduct(result.data.products);
      });
  }, []);
  return (
    <div>
      <Header />
      {product.name}
    </div>
  );
};

export default ProductDetail;
