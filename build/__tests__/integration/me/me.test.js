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
describe("GET /", () => {
    it("it should return 404 if non-existent route is supplied", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/");
        expect(response.status).toBe(404);
        done();
    }));
    it("it should return my profile", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/v1");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Welcome to my rule validation API");
        expect(response.body.data).toEqual({
            name: "Abasifreke Ekwere",
            github: "@KingAbesh",
            email: "abeshekwere@gmail.com",
            mobile: "+234(0)7067484464",
        });
        done();
    }));
});
//# sourceMappingURL=me.test.js.map