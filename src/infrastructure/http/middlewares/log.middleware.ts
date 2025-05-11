import colors from "colors";
import { NextFunction, Request, Response } from "express";

export function logRequest(req: Request, _: Response, next: NextFunction) {
  console.debug(colors.magenta(req.method), req.path);
  console.debug("Headers\n", req.headers);
  console.debug("Body\n", colors.cyan(req.body));
  next();
}