import React, { useState } from "react";

import StarRatingComponent from "react-star-rating-component";

import Axios from "axios";
import Edit from "../../components/Edit";
import Input from "../../components/Input";
import Button from "../../components/Button";

const ProductReviewEdit = (props: any) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const submit = async () => {
    const body = { title, text, rating, productId: props.match.params.id };
    try {
      const result = await Axios.post(
        "http://localhost:4000/product_reviews/create",
        body,
        {
          withCredentials: true
        }
      );
      console.log(result);
      alert("글작성이 완료되었습니다.");
      props.history.push("/");
    } catch (e) {
      console.log("ERROR~!!", e.response.data);
    }
  };

  const starMove = (e: number) => {
    setRating(e);
  };

  return (
    <div>
      <Input
        label="제목"
        type="text"
        placeholder="제목을 입력해주세요"
        setValue={e => {
          setTitle(e.target.value);
        }}
      />
      <div>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          renderStarIcon={() => <span></span>}
          onStarClick={e => starMove(e)}
        />
      </div>
      <Edit setText={setText} />
      <Button text="리뷰작성" onButtonClick={() => submit()} />
    </div>
  );
};

export default ProductReviewEdit;
