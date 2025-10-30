const request = require("supertest");
const app = require("../src/app");

// GET /users
describe("GET /users", () => {
  it("responde con json y contiene una lista de usuarios", (done) => {
    request(app)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (!Array.isArray(res.body.data)) return done(new Error("data no es un array"));
        done();
      });
  });
});

// GET /users/:id
describe("GET /users/:id", () => {
  it("responde 200 cuando el id es U001", (done) => {
    request(app)
      .get("/users/U001")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, '"Usuario 001 correcto"', done);
  });

  it("responde 404 cuando el id no existe", (done) => {
    request(app)
      .get("/users/XYZ")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, '"Usuario no encontrado"', done);
  });
});

// POST /users
describe("POST /users", () => {
  it("201 cuando envían username y password", (done) => {
    request(app)
      .post("/users")
      .send({ username: "admin2", password: "admin01" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, '"Usuario creado"', done);
  });

  it("400 cuando faltan datos", (done) => {
    request(app)
      .post("/users")
      .send({})
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400, '"Usuario no creado"', done);
  });
});
