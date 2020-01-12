import React from "react";
import styled from "styled-components";

const BaseButton = styled.button`
  float: left;
  width: 23px;
  height: 22px;
  border: none;
  background-color: #f3f3f3;
`;

const BaseInput = styled.input`
  float: left;
  width: 40px;
  height: 15px;
  text-align: center;
  outline: none;
`;

const Container = styled.div`
  display: inline-block;
`;

export default ({
  value,
  setValue
}: {
  value: number;
  setValue: (v: any) => void;
}) => {
  return (
    <Container>
      <BaseButton
        onClick={() => {
          if (value > 1) {
            setValue(value - 1);
          }
        }}
      >
        -
      </BaseButton>
      <BaseInput value={value} readOnly />
      <BaseButton onClick={() => setValue(value + 1)}>+</BaseButton>
    </Container>
  );
};
