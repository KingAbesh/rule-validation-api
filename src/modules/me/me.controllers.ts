import createResponse from "@helpers/createResponse";
import { HTTP } from "@constants/statuscode";
import { Response, Request } from "express";
import * as MeService from "./me.services";

export const getProfile = (_: Request, res: Response) => {
  const profile = MeService.getProfile();

  createResponse("Welcome to my rule validation API", profile)(res, HTTP.OK);
};
