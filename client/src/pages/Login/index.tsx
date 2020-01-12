import React, { useState } from "react";

import styles from "./index.module.css";
import Button from "../../components/Button";

import Title from "../../components/Title";
import { loginAsync } from "../../reducers/user";
import { useDispatch } from "react-redux";

const Login = (props: any) => {
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  return (
    <div className={styles.login}>
      <Title title="로그인" />
      <form>
        <div>
          <label>아이디</label>
          <input
            type="text"
            value={nick}
            placeholder="아이디를 입력해 주세요"
            onChange={e => setNick(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            placeholder="비밀번호를 입력해 주세요"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </form>
      {errorMessage && <div className={styles.notify}>{errorMessage}</div>}
      <Button
        text="로그인"
        onButtonClick={async e => {
          e.preventDefault();

          try {
            await loginAsync(nick, password, dispatch);
            props.history.push("/");
          } catch (e) {
            e.response && e.response.data
              ? setErrorMessage(e.response.data.errorMessage)
              : setErrorMessage(e.message);
          }
        }}
      />
    </div>
  );
};

export default Login;
