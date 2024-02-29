const request = require("supertest");
// express app
const app = require("./index");

// db setup
const { db } = require("./db/db");
const { User, Comment, Like } = require("./models");
const seed = require("./db/seed");
const { userData } = require("./db/usersData");
const { commentData } = require("./db/commentsData");

describe("Endpoints", () => {
  // to be used in POST test
  const testCommentData = {
    text: "it's nice to be able to see historic weather data",
    UserId: 1
  };

  beforeAll(async () => {
    // rebuild db before the test suite runs
    await seed();
  });

  describe("GET /comments", () => {
    it("should return list of all comments with correct data", async () => {
      // make a request
      const response = await request(app).get("/comments");
      // assert a response code
      expect(response.status).toBe(200);
      // expect a response
      expect(response.body).toBeDefined();
      // toEqual checks deep equality in objects
      expect(response.body[0].text).toEqual(commentData[0].text);
    });
  });
  // issues w/ auth
  describe("GET /my-comments", () => {
    it("should return list of all user's comments with correct data", async () => {
      // make a request
      const response = await request(app).get("/my-comments");
      // assert a response code
      expect(response.status).toBe(201);
      // expect a response
      expect(response.body).toBeDefined();
      // toEqual checks deep equality in objects
      expect(response.body[0].UserId).toEqual(expect.objectContaining(commentData.UserId));
    });
  });

});
