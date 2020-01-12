import React from "react";

import Title from "../../components/Title";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import Table from "../../components/Table";

interface IProductQuestion {
  id: number;
  title: string;
  text: string;
  user: { nick: string };
  createdAt: Date;
  open: boolean;
  product_question_reads: Array<{ id: number; productQuestionId: number }>;
}

const ProductQuestionList = ({
  productQuestion,
  setProductQuestion,
  product_id
}: {
  productQuestion: IProductQuestion[];
  setProductQuestion: any;
  product_id: number;
}) => {
  const nick = useSelector((state: { nick: string }) => state.nick);

  return (
    <div>
      <Title title="상품문의" />
      <Table
        productQuestion={productQuestion}
        setProductQuestion={setProductQuestion}
      />
      {nick && (
        <Link to={`/products/${product_id}/new_question`}>
          <Button text="문의하기" />
        </Link>
      )}
    </div>
  );
};

export default ProductQuestionList;
