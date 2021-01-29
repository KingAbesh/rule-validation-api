import express from "express";
import { HTTP } from "@constants/statuscode";
import createResponse from "@helpers/createResponse";
import * as validateService from "./validate.services";
import { Response } from "@constants/response";

export const validateRule = (req: express.Request, res: express.Response) => {
  const { validation, message } = validateService.validate(req.body);

  if (validation.error) {
    createResponse(message, { validation }, Response.ERROR)(res, HTTP.BAD_REQUEST);
    return;
  }

  createResponse(message, { validation })(res, HTTP.OK);
};
