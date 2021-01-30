"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../../app")); // Link to your server file
const supertest = require("supertest");
const request = supertest(app_1.default);
const invalid_json_1 = __importDefault(require("../../mocks/invalid.json"));
const no_rule_field_json_1 = __importDefault(require("../../mocks/no-rule-field.json"));
const no_required_field_within_rule_object_json_1 = __importDefault(require("../../mocks/no-required-field-within-rule-object.json"));
const wrong_type_json_1 = __importDefault(require("../../mocks/wrong-type.json"));
const field_not_in_data_json_1 = __importDefault(require("../../mocks/field-not-in-data.json"));
const fails_validation_json_1 = __importDefault(require("../../mocks/fails-validation.json"));
const passes_validation_json_1 = __importDefault(require("../../mocks/passes-validation.json"));
describe("POST /rule-validate", () => {
    it("it should return 404 if non-existent route is supplied", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/a-random-route");
        expect(response.status).toBe(404);
        done();
    }));
    it("it should handle invalid JSON payloads", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/api/v1/validate-rule")
            .send(invalid_json_1.default)
            .type("json")
            .expect("Content-Type", /json/);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid JSON payload passed.");
        expect(response.body.data).toBeNull();
        done();
    }));
    it("it should return 400 if rule is not passed", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/api/v1/validate-rule")
            .send(no_rule_field_json_1.default)
            .type("json")
            .expect("Content-Type", /json/);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("rule is required.");
        expect(response.body.data).toBeNull();
        done();
    }));
    it("it should return 400 if required field within rule object [condition] is not passed", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/api/v1/validate-rule")
            .send(no_required_field_within_rule_object_json_1.default)
            .type("json")
            .expect("Content-Type", /json/);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("condition is required.");
        expect(response.body.data).toBeNull();
        done();
    }));
    it("it should return 400 if field is of wrong type", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/api/v1/validate-rule")
            .send(wrong_type_json_1.default)
            .type("json")
            .expect("Content-Type", /json/);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("rule should be an object.");
        expect(response.body.data).toBeNull();
        done();
    }));
    it("it should return 400 if field in rule is not in data", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/api/v1/validate-rule")
            .send(field_not_in_data_json_1.default)
            .type("json")
            .expect("Content-Type", /json/);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("field 5 is missing from data.");
        expect(response.body.data).toBeNull();
        done();
    }));
    it("it should return 400 if validation rule does not return true", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/api/v1/validate-rule")
            .send(fails_validation_json_1.default)
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
    }));
    it("it should return 200 if validation rule is passed", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/api/v1/validate-rule")
            .send(passes_validation_json_1.default)
            .type("json")
            .expect("Content-Type", /json/);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("field missions.count successfully validated.");
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
    }));
});
//# sourceMappingURL=validate.test.js.map