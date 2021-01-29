export const ruleDataCheckSum = (payload: object) => {

	
	const field = payload["rule"]["field"].split(".");
	
	const data: any[] = Object.keys(payload["data"]);

  if (!data.includes(field[0])) { // { field: "missions"}
    return `field ${field[0]} is missing from data.`;
  }
	
	const nestedData: any[] = Object.keys(payload["data"][field[0]]);

  if (field.length > 1) { // { field: "missions.count"}
    if (!nestedData.includes(field[1])) {
      return `field ${field[1]} is missing from data.`;
    }
  }

  return payload;
};
