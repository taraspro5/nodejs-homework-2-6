import mongoose from "mongoose";
import request from "supertest";
import bcrypt from "bcrypt";
import "dotenv/config.js";

import app from "../../app.js";

import User from "../../models/User.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test /users/login", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test login with correct data", async () => {
    const loginData = {
      email: "Grusza@gmail.com",
      password: "123123",
    };

    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);

    const user = await User.findOne({ email: loginData.email });
    const passwordCompare = await bcrypt.compare(
      loginData.password,
      user.password
    );
    expect(passwordCompare).toBe(true);
  });
});
