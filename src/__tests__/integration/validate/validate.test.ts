import app from "../../../app"; // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

import invalidJson from "../../mocks/invalid.json";
import noRuleJson from "../../mocks/no-rule-field.json";
import noFieldRequiredWithinRuleJson from "../../mocks/no-required-field-within-rule-object.json";
import fieldIsOfWrongTypeJson from "../../mocks/wrong-type.json";
import fieldNotInDataJson from "../../mocks/field-not-in-data.json";
import failsValidationJson from "../../mocks/fails-validation.json";
import passesValidationJson from "../../mocks/passes-validation.json";

describe("POST /rule-validate", () => {
  it("it should return 404 if non-existent route is supplied", async (done) => {
    const response = await request.get("/a-random-route");

    expect(response.status).toBe(404);
    done();
  });

  it("it should handle invalid JSON payloads", async (done) => {
    const response = await request
      .post("/api/v1/validate-rule")
      .send(invalidJson)
      .type("json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid JSON payload passed.");
    expect(response.body.data).toBeNull();
    done();
  });

  it("it should return 400 if rule is not passed", async (done) => {
    const response = await request
      .post("/api/v1/validate-rule")
      .send(noRuleJson)
      .type("json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("rule is required.");
    expect(response.body.data).toBeNull();
    done();
  });

  it("it should return 400 if required field within rule object [condition] is not passed", async (done) => {
    const response = await request
      .post("/api/v1/validate-rule")
      .send(noFieldRequiredWithinRuleJson)
      .type("json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("condition is required.");
    expect(response.body.data).toBeNull();
    done();
  });

  it("it should return 400 if field is of wrong type", async (done) => {
    const response = await request
      .post("/api/v1/validate-rule")
      .send(fieldIsOfWrongTypeJson)
      .type("json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("rule should be an object.");
    expect(response.body.data).toBeNull();
    done();
  });

  it("it should return 400 if field in rule is not in data", async (done) => {
    const response = await request
      .post("/api/v1/validate-rule")
      .send(fieldNotInDataJson)
      .type("json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("field 5 is missing from data.");
    expect(response.body.data).toBeNull();
    done();
  });

  it("it should return 400 if validation rule does not return true", async (done) => {
    const response = await request
      .post("/api/v1/validate-rule")
      .send(failsValidationJson)
      .type("json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("field 0 failed validation.");
    expect(response.body.data).toEqual({
      validation: {
        condition: "eq",
        condition_value: "a",
        error: true,
        field: "0",
        field_value: "d",
      },
    });
    done();
  });

  it("it should return 200 if validation rule is passed", async (done) => {
    const response = await request
      .post("/api/v1/validate-rule")
      .send(passesValidationJson)
      .type("json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "field missions.count successfully validated."
    );
    expect(response.body.data).toEqual({
      validation: {
        error: false,
        field: "missions.count",
        field_value: 45,
        condition: "gte",
        condition_value: 30,
      },
    });
    done();
  });
});
