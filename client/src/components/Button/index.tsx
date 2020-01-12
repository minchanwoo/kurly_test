import React from "react";

import "./index.css";

interface IButtonType {
  text: string;
  onButtonClick?: (e: any) => void;
}

const Button = ({ text, onButtonClick }: IButtonType) => {
  return (
    <div className="button" onClick={onButtonClick}>
      {text}
    </div>
  );
};

export default Button;
