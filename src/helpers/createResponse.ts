import { Response } from "express";

interface ResponseDTO {
  status: string;
  message: string;
  data: Object | Object[];
}

/**
 * Creates a reusable response payload
 *
 * @returns Response
 */
export default function createResponse(
  message: string,
  data: string | Object | Object[] = [],
  status: string = "success"
): (res: Response, code: number) => Response {
  return (res, code) => {
    return res.status(code).json({ status, message, data } as ResponseDTO);
  };
}
