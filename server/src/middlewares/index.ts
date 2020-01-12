import { Request, Response, NextFunction } from "express";

export const onlyLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.user || !req.session.user.id) {
    res.status(500).send({ errorMessage: "로그인 후 이용가능합니다" });
    return;
  }
  next();
};
