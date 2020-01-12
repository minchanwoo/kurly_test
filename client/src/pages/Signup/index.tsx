import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Button from "../../components/Button";

import "./index.css";
import Title from "../../components/Title";
import Input from "../../components/Input";

const Signup = (props: any) => {
  const [nick, setNick] = useState("");
  const [nickValidate, setNickValidate] = useState("");
  const [name, setName] = useState("");
  const [nameValidate, setNameValidate] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmValidate, setPasswordConfirmValidate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="signUp">
      <Title title="회원가입" />
      <div className="signUp_info">*필수입력사항</div>
      <form>
        <div>
          <Input
            nick={nick}
            label="아이디*"
            type="text"
            placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
            setValue={e => {
              setNick(e.target.value);
              setNickValidate(e.target.value ? "" : "아이디를 입력해주세요");
            }}
            setValueValidate={() => {
              setNickValidate(nick ? "" : "아이디를 입력해주세요");
            }}
          />
          <Button
            onButtonClick={async e => {
              e.preventDefault();
              const result = await axios.get(
                `http://localhost:4000/users/check_user?nick=${nick}`
              );
              setNickValidate(
                result.data.exist
                  ? "이미 존재하는 아이디입니다."
                  : "사용가능한 아이디입니다."
              );
            }}
            text="중복확인"
          />
        </div>
        {nickValidate && <span className="notify">{nickValidate}</span>}
        <div>
          <Input
            nick={password}
            label="비밀번호*"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            setValue={e => {
              setPassword(e.target.value);
              setPasswordValidate(
                e.target.value ? "" : "비밀번호를 입력해 주세요"
              );
            }}
            setValueValidate={() => {
              setPasswordValidate(password ? "" : "비밀번호를 입력해 주세요");
            }}
          />
        </div>
        {passwordValidate && <span className="notify">{passwordValidate}</span>}
        <div>
          <Input
            nick={passwordConfirm}
            label="비밀번호확인*"
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            setValue={e => {
              setPasswordConfirm(e.target.value);
              setPasswordConfirmValidate(
                e.target.value ? "" : "비밀번호를 한번 더 입력해주세요"
              );
            }}
            setValueValidate={() => {
              setPasswordConfirmValidate(
                passwordConfirm ? "" : "비밀번호를 한번 더 입력해주세요"
              );
            }}
          />
        </div>
        {passwordConfirmValidate && (
          <span className="notify">{passwordConfirmValidate}</span>
        )}
        <div>
          <Input
            label="이름*"
            nick={name}
            type="text"
            placeholder="고객님의 이름을 입력해 주세요"
            setValue={e => {
              setName(e.target.value);
              setNameValidate(e.target.value ? "" : "이름을 입력해주세요");
            }}
            setValueValidate={() => {
              setNameValidate(name ? "" : "이름을 입력해주세요");
            }}
          />
        </div>
        {nameValidate && <span className="notify">{nameValidate}</span>}
        <div>
          <Input
            label="이메일*"
            nick={email}
            type="email"
            placeholder="고객님의 이름을 입력해 주세요"
            setValue={e => {
              setEmail(e.target.value);
              setEmailValidate(e.target.value ? "" : "이메일을 입력해주세요");
            }}
            setValueValidate={() => {
              setEmailValidate(email ? "" : "이메일을 입력해주세요");
            }}
          />
          <Button
            onButtonClick={async e => {
              e.preventDefault();
              const result = await axios.get(
                `http://localhost:4000/users/check_user?email=${email}`
              );
              console.log(result);
            }}
            text="이메일 중복확인"
          />
        </div>
        {emailValidate && <span className="notify">{emailValidate}</span>}
        <div>
          <Button
            text="주소찾기"
            onButtonClick={e => {
              e.preventDefault();
              const { daum } = window as any;
              new daum.Postcode({
                oncomplete: function(data: any) {
                  // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                  // 예제를 참고하여 다양한 활용법을 확인해 보세요.
                  console.log("hahaha", data);
                }
              }).open();
            }}
          />
        </div>
      </form>
      <Button text="약관보기" onButtonClick={() => setModalOpen(true)} />
      <Modal isOpen={modalOpen}>
        <Button text="닫기" onButtonClick={() => setModalOpen(false)} />
        <div>안녕하세요 마켓컬리입니다</div>
      </Modal>
      <div className="joinBtn">
        <Button
          text="가입하기"
          onButtonClick={async () => {
            const body = { nick, email, password, passwordConfirm, name };

            await axios.post("http://localhost:4000/users/signup", body);
            props.history.push("/login");
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
