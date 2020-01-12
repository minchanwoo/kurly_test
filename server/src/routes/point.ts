import { Router } from "express";
import { onlyLoggedIn } from "../middlewares";
import Point from "../models/point";

import _ from "lodash";

const router = Router();

//포인트를 받아와 총 금액을 합쳐주는 3가지 방법
//1. 로대시 유틸리티 라이브러리 사용
router.get("/sum", onlyLoggedIn, async (req, res) => {
  const {
    user: { id }
  } = req.session;

  const points = await Point.findAll({
    where: { userId: id }
  });
  const sum = _.sumBy(points, "amount");
  res.send({ sum });
});

//2. 데이터베이스에서 받아온 배열을 forEach반복문으로 amount만 뽑아내 변수에 담아 보내는 방법
// router.get("/sum", onlyLoggedIn, async (req, res) => {
//   const {
//     user: { id }
//   } = req.session;

//   const points = await Point.findAll({
//     where: { userId: id }
//   });

//   let point = 0;
//   points.forEach((p: any) => {
//     point += p.amount;
//   });

//   res.send({ point });
// });

//3. 데이터베이스에서 가져올때 sum메서드를 사용해서 애초에 값을 모두 더해서 가져오는 방법
// router.get("/sum", onlyLoggedIn, async (req, res) => {
//   const {
//     user: { id }
//   } = req.session;

//   const points = await Point.sum("amount" as any, {
//     where: { userId: id }
//   });

//   res.send({ points });
// });

//위와같이 3가지 방법이 있으며 어떤걸 써도 상관없지만 3가지 다 반복연습해보자 (일단 1번을 제외한 나머지는 주석처리)
//속도적인 측면에서 봤을때에는 아무래도 로대시같은 라이브러리 보다는 2,3 번이 더 빠르다(데이터는 계속 쌓이니까)

router.get("/my", onlyLoggedIn, async (req, res) => {
  const { user } = req.session;
  const { limit } = req.query;

  const points = await Point.findAll({
    where: { userId: user.id },
    order: [["ID", "DESC"]],
    attributes: ["amount", "createdAt"],
    limit: limit ? Number(limit) : undefined
  });

  res.send({ points });
});

//onlyAdmin 미들웨어 추가 해야 함~!!
router.post("/add", async (req, res) => {
  const { point_list } = req.body;

  await Point.bulkCreate(point_list);

  res.send(true);
});

export default router;
