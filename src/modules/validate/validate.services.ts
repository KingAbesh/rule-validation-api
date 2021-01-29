import { buildData } from "@helpers/buildData";

export const validate = (payload: object) => {
  return buildData(payload);
};
