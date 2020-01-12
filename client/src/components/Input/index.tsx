import React from "react";
import styles from "./index.module.css";

interface IInput {
  label: string;
  type: string;
  nick?: string;
  placeholder?: string;
  setValue?: (e: any) => void;
  setValueValidate?: any;
  readOnly?: any;
}

const Input = ({
  label,
  type,
  nick,
  placeholder,
  setValue,
  setValueValidate,
  readOnly
}: IInput) => {
  return (
    <span className={styles.input_comp}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={setValue}
        value={nick}
        onFocus={setValueValidate}
        readOnly={readOnly}
      />
    </span>
  );
};

export default Input;
