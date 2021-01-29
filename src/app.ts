import "module-alias/register";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";

import config from "@config";
import createError from "@helpers/createError";
import { Response } from "@constants/response";

import routes from "@modules/routes";
import { HTTP } from "@constants/statuscode";

const app = express();

app.disable("x-powered-by");

// global middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

// catch invalid JSON payloads
app.use(function (
  _err: Error,
  _req: express.Request,
  _res: express.Response,
  _: express.NextFunction
) {
  if (_err instanceof SyntaxError) {
    _res.status(HTTP.BAD_REQUEST).json({
      status: Response.ERROR,
      message: "Invalid JSON payload passed.",
      data: null,
    });
  }
});

const apiRouter = express.Router();

// expose routes here
apiRouter.use(routes());

// handler for route-not-found
apiRouter.use((_req, _res, next) => {
  next(
    createError(404, [
      {
        status: Response.ERROR,
        message: "Route not found.",
        data: null,
      },
    ])
  );
});

// error handler for api router
apiRouter.use(
  (
    error: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (!error.statusCode) {
      error = createError(HTTP.SERVER_ERROR, [
        {
          status: Response.ERROR,
          message: "Internal Server Error.",
          data: error.toString(),
          stack: error.stack,
        },
      ]);
    }
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      data: error.errors,
      //   ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
);

const apiURL = `/api/${config().version}`;

app.use(apiURL, apiRouter);

export default app;
