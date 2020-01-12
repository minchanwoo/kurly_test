import React from "react";

const on_checked = require("../Images/on_checkbox.webp");
const off_checked = require("../Images/off_checkbox.webp");

const Checkbox = ({
  checked,
  onChange
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div onClick={() => onChange()} style={{ display: "inline-block" }}>
      <img src={checked ? on_checked : off_checked} />
    </div>
  );
};

export default Checkbox;
