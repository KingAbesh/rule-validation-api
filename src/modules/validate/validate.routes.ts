import { validateRequest } from "@middlewares/validateRequest";
import { Router } from "express";
import * as ValidateController from "./validate.controllers";
import { validPayload } from "./validate.schemas";

const router = Router();

router.post(
  "*",
  validateRequest(validPayload),
  ValidateController.validateRule
);

export default router;
