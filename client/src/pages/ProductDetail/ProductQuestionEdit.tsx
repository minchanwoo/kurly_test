import React, { useState } from "react";

import Axios from "axios";
import Edit from "../../components/Edit";
import Input from "../../components/Input";
import Button from "../../components/Button";

const ProductQuestionEdit = (props: any) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const submit = async () => {
    const body = { title, text, productId: props.match.params.id };
    try {
      const result = await Axios.post(
        "http://localhost:4000/product_questions/create",
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
      <Edit setText={setText} />
      <Button text="작성하기" onButtonClick={() => submit()} />
    </div>
  );
};

export default ProductQuestionEdit;
