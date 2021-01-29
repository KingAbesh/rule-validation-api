import isPlainObject from "./isPlainObject";

export const checkType = (schema: object, payload: object) => {
  const list: any[] = Object.keys(schema);

  const typeCheck = recursivelyCheckType(payload, list, schema);

  return typeCheck === "" ? payload : typeCheck;
};

const recursivelyCheckType = (
  payload: object,
  list: Array<any>,
  schema: object,
  index = 0
) => {
  if (list[index] === "rule" && !isPlainObject(payload[list[index]])) {
    return `rule should be an object.`;
  }

  if (
    list[index] === "data" &&
    !isPlainObject(payload[list[index]]) &&
    !Array.isArray(payload[list[index]]) &&
    typeof payload[list[index]] !== "string"
  ) {
    return `data should be a|an object, array or string.`;
  }

  if (index === list.length - 1) {
    return "";
  }

  return recursivelyCheckType(payload, list, schema, ++index);
};
