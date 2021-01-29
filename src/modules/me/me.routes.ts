import { Router } from "express";
import * as MeController from "./me.controllers";

const router = Router();


router.get("/", MeController.getProfile);

export default router;
