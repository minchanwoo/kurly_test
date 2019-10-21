import express from "express";
import cors from "cors";
import models from "./models";

import routes from "./routes";

const app = express();

app.set("port", process.env.PORT || 4000);
models.sequelize.sync();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use("/", routes);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 대기중~!!");
});
