import app from "../../../app"; // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

describe("GET /", () => {
  it("it should return 404 if non-existent route is supplied", async (done) => {
    const response = await request.get("/");

    expect(response.status).toBe(404);
    done();
  });

  it("it should return my profile", async (done) => {
    const response = await request.get("/api/v1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Welcome to my rule validation API");
    expect(response.body.data).toEqual({
      name: "Abasifreke Ekwere",
      github: "@KingAbesh",
      email: "abeshekwere@gmail.com",
      mobile: "+234(0)7067484464",
    });
    done();
  });
});
