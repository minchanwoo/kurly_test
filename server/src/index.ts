import express from "express";
import cors from "cors";
import session from "express-session";
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use("/", routes);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 대기중~!!");
});
