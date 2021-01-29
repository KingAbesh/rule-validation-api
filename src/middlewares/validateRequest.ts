import { Response } from "@constants/response";
import { checkRequired } from "@helpers/checkRequired";
import { checkType } from "@helpers/checkType";
import { ruleDataCheckSum } from "@helpers/ruleDataCheckSum";
import createError from "@helpers/createError";
import express from "express";
import { HTTP } from "@constants/statuscode";

export const validateRequest = (schema, field = "body") => {
  return (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    const required = checkRequired(schema, req[field]); // we return a string (error message) or the request body (object)

    if (typeof required === "string") {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: Response.ERROR,
            message: required,
            data: null,
          },
        ])
      );
    }

    const type = checkType(schema, req[field]); // we return a string (error message) or the request body (object)

    if (typeof type === "string") {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: Response.ERROR,
            message: type,
            data: null,
          },
        ])
      );
    }

    const ruleMatchesData = ruleDataCheckSum(req[field]); // we return a string (error message) or the request body (object)

    if (typeof ruleMatchesData === "string") {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: Response.ERROR,
            message: ruleMatchesData,
            data: null,
          },
        ])
      );
    }

    next();
  };
};
