import { Router } from "express";

import meRoutes from "./me/me.routes";
import validateRoutes from "./validate/validate.routes";

export default function routes() {
  const router = Router();

  router.use("/validate-rule", validateRoutes);
  router.use("/", meRoutes);

  return router;
}
