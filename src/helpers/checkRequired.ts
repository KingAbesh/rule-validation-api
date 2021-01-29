import isPlainObject from "./isPlainObject";

export const checkRequired = (schema: object, payload: object) => {
  const list: any[] = Object.keys(schema);

  const fieldCheck = recursivelyCheckFields(payload, list, schema);

  if (fieldCheck === "" && isPlainObject(payload[list[0]])) { // only check that rule has all required fields if rule is an object
    const ruleChildrenFieldCheck = recursivelyCheckFields(
      payload[list[0]],
      Object.keys(schema[list[0]]),
      schema[list[0]]
    );

    if (ruleChildrenFieldCheck !== "") {
      return ruleChildrenFieldCheck;
    }
  }
  return fieldCheck === "" ? payload : fieldCheck;
};

const recursivelyCheckFields = (
  payload: object,
  list: Array<any>,
  schema: object,
  index = 0
) => {
  if (payload[list[index]] === undefined || payload[list[index]] === null) {
    return `${list[index]} is required.`;
  }

  if (index === list.length - 1) {
    return "";
  }

  return recursivelyCheckFields(payload, list, schema, ++index);
};
