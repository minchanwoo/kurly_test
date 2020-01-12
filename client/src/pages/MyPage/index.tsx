import React, { useEffect, useState } from "react";
import Axios from "axios";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

const MyPage = (props: any) => {
  const [userId, setUserId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sumMyPoint, setSumMyPoint] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:4000/users/my", { withCredentials: true })
      .then(result => {
        setUserId(result.data.id);
        setName(result.data.name);
        setEmail(result.data.email);
      })
      .catch((e: any) => {
        console.log(e.response.data.errorMessage);
        // alert(e.response.data.errorMessage);
        // props.history.push("/login");
      });
    Axios.get("http://localhost:4000/points/sum", {
      withCredentials: true
    }).then(result => {
      setSumMyPoint(result.data.sum);
    });
  }, []);

  const update = async () => {
    const body = { password, newPassword, newPasswordConfirm };

    try {
      await Axios.post(`http://localhost:4000/users/${userId}/update`, body, {
        withCredentials: true
      });
      alert("회원정보수정이 완료되었습니다.");
      props.history.push("/");
    } catch (e) {
      e.response && e.response.data
        ? setErrorMessage(e.response.data.errorMessage)
        : setErrorMessage(e.message);
    }
  };

  return (
    <div>
      <Title title="마이페이지" />
      <div
        style={{
          textAlign: "right",
          fontSize: "14px",
          color: "#333",
          margin: "10px 100px 20px 0"
        }}
      >
        보유포인트: {sumMyPoint.toLocaleString()}원
      </div>
      <Link to="/mypage/orders">내 주문확인</Link>
      <div>
        <Input type="text" label="이름" nick={name} readOnly />
      </div>
      <div>
        <Input type="email" label="이메일" nick={email} readOnly />
      </div>
      <div>
        <Input
          type="password"
          label="현재 비밀번호"
          placeholder="현재 비밀번호"
          setValue={e => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <Input
          type="password"
          label="새로운 비밀번호"
          placeholder="새로운 비밀번호를 입력해 주세요"
          setValue={e => {
            setNewPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <Input
          type="password"
          label="새로운 비밀번호확인"
          placeholder="새 비밀번호를 한번 더 입력해주세요"
          setValue={e => {
            setNewPasswordConfirm(e.target.value);
          }}
        />
      </div>
      {errorMessage && (
        <div style={{ color: "#333", fontSize: "10px", margin: "11px" }}>
          {errorMessage}
        </div>
      )}
      <Button text="비밀번호 변경하기" onButtonClick={() => update()} />
    </div>
  );
};

export default MyPage;
