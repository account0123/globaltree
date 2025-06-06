import { Request, Response } from "express";

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    error: {
      type: "EndpointNotFound",
      message: "Endpoint not found",
      path: req.originalUrl,
    },
  });
}
