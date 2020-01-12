import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

const router = Router();

router.get("/check_user", async (req, res) => {
  const { nick, email } = req.query;
  if (nick) {
    const result = await User.findOne({ where: { nick } });
    res.send({ exist: Boolean(result) });
  } else if (email) {
    const result = await User.findOne({ where: { email } });
    res.send({ exist: Boolean(result) });
  }
});

router.post("/signup", async (req, res) => {
  const { nick, name, email, password, passwordConfirm } = req.body;
  const hash = await bcrypt.hash(password, 12);
  await User.create({
    nick,
    name,
    email,
    password: hash
  });
  res.send({ success: true });
});

router.post("/login", async (req, res) => {
  const { nick, password } = req.body;

  try {
    const loggedInUser = await User.findOne({ where: { nick } });
    if (!loggedInUser) {
      throw new Error("아이디가 불일치합니다.");
    }
    const compare = await bcrypt.compare(password, loggedInUser.password);
    if (!compare) {
      throw new Error("비밀번호가 틀립니다.");
    }
    res.send({ nick: loggedInUser.nick });
    req.session.user = {
      id: loggedInUser.id,
      nick: loggedInUser.nick,
      name: loggedInUser.name
    };
    req.session.save(() => {});
  } catch (e) {
    res.status(500).send({ errorMessage: e.message });
  }
});

router.get("/logged_in_account", (req, res) => {
  if (req.session || req.session.user) {
    res.send(req.session.user);
  } else {
    res.send(null);
  }
});

router.get("/my", async (req, res) => {
  if (!req.session || !req.session.user) {
    res.status(500).send({ errorMessage: "로그인 후 이용가능합니다" });
    return;
  }
  const result = await User.findOne({ where: { id: req.session.user.id } });
  res.send(result);
});

router.post("/:id/update", async (req, res) => {
  const { password, newPassword, newPasswordConfirm } = req.body;

  const userById = await User.findOne({ where: { id: req.session.user.id } });
  if (!userById) {
    res.status(500).send({ errorMessage: "본인의 계정만 수정이 가능합니다." });
    return;
  }
  const comparePass = await bcrypt.compare(password, userById.password);
  if (!comparePass) {
    res.status(500).send({
      errorMessage: "기존 가입된 비밀번호와 현재 비밀번호가 다릅니다"
    });
    return;
  }
  if (newPassword !== newPasswordConfirm) {
    res
      .status(500)
      .send({ errorMessage: "비밀번호와 비밀번호 확인값이 다릅니다." });
    return;
  }

  const hashPass = await bcrypt.hash(newPassword, 12);
  await User.update({ password: hashPass }, { where: { id: req.params.id } });
  res.send(true);
  req.session.user = {
    id: req.session.user.id,
    nick: userById.nick,
    name: userById.name
  };
  req.session.save(() => {});
});

router.post("/logout", async (req, res) => {
  req.session.destroy(() => {});
  res.send(true);
});

export default router;
