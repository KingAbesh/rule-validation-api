import { Response } from "@constants/response";
import { HTTP } from "@constants/statuscode";

interface ErrorObject {
  status?: string;
  message: string;
  data: string | object | null;
  stack?: string;
}

/**
 * Creates an error payload
 */
export default function createError(status: number, data: ErrorObject[]) {
  return {
    status: data[0].status,
    errors: data[0].data,
    message: data[0].message,
    stack: new Error().stack,
    statusCode: status,
  };
}

createError.InternalServerError = (data: string) =>
  createError(HTTP.SERVER_ERROR, [
    {
      status: Response.ERROR,
      message: "Internal Server Error.",
      data,
      stack: process.env.NODE === "development" ? new Error().stack : undefined,
    },
  ]);
