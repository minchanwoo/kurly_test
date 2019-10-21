import express from "express";
import models from "./models";

const app = express();

app.set("port", process.env.PORT || 4000);
models.sequelize.sync();

app.get("/", (req, res) => {
  res.send("hello~!!");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 대기중~!!");
});
