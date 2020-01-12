import React from "react";
import styled from "styled-components";

const Title = styled.h2`
  font-size: 20px;
  color: #333;
`;

export default ({ title }: { title: string }) => {
  return <Title>{title}</Title>;
};
