"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _users = _interopRequireDefault(require("../models/users"));

var _app = _interopRequireDefault(require("../app"));

var _tokenGen = _interopRequireDefault(require("../helper/tokenGen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var tok = (0, _tokenGen["default"])("kgiramata%7@gmail.com");
var tok2 = (0, _tokenGen["default"])("kgiramata57@gmail.com", "1");
var user = {
  firstname: "Giramata",
  lastname: "Karen",
  email: "kgiramata%7@gmail.com",
  phoneNumber: "078888",
  username: "gkar",
  password: "1234567"
};
var logUser = {
  email: "kgiramata%7@gmail.com",
  password: "1234567"
};
var redflag = {
  title: "robbery",
  type: "red-flag",
  comment: "Urgent",
  location: "KG 30 ST 5",
  status: "yet to be resolved"
};
var redflag2 = {
  title: "",
  type: "red-flag",
  comment: "Urgent",
  location: "KG 30 ST 5",
  status: "yet to be resolved"
};
describe("sign Up tests", function () {
  it("user should be able to create an account", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(user).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property("message", "User successfully created");
      res.body.should.be.a("object");
      done();
    });
  });
  it("user should not be able to create account when invalid firstname", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send({
      firstname: "",
      lastname: "Karen",
      email: "kgiramata%7@gmail",
      phoneNumber: "078888",
      username: "gkar",
      password: "1234567"
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should not be able to create account when email already exists", function (done) {
    _users["default"].push(user);

    _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(user).end(function (err, res) {
      res.should.have.status(409);
      res.body.should.have.property("message", "user already exists");
      res.body.should.be.an("object");
      done();
    });
  });
});
describe("sign in tests", function () {
  it("user should be able to log into their account", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signin").send(logUser).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property("message", "User successfully logged in");
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should not be able to log in when password is incorrect", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signin").send({
      email: "kgiramata%7@gmail.com",
      password: "123490"
    }).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property("error", "Password or email is incorrect");
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should not be able to log in when invalid email", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signin").send({
      email: " ",
      password: "1234567"
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should not be able to log in when email does not exist", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signin").send({
      email: "kgiramata@gmail.com",
      password: "1234567"
    }).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property("error", "Password or email is incorrect");
      res.body.should.be.an("object");
      done();
    });
  });
});
describe("first page test", function () {
  it("welcome page", function (done) {
    _chai["default"].request(_app["default"]).get("/").send().end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property("message", "Broadcaster project");
      res.body.should.be.a("object");
      done();
    });
  });
});
describe(" record tests", function () {
  it("user should be able to create a record", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/red-flags/").set("token", tok).send(redflag).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property("message", "record created successfully");
      res.body.should.be.a("object");
      done();
    });
  });
  it("user should not be able to create a record when invalid title", function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/red-flags/").set("token", tok).send(redflag2).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property("error", '"title" is not allowed to be empty');
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should be able to view all red-flags", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/red-flags/red-flags").send(redflag).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should be able to view one specific red-flag", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/red-flags/1").send().end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should not be able to view a specific red-flag if id does not exist", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/red-flags/2").send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property("message", "Record not found");
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should be able to edit the location of a record they created", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/1/location").set("token", tok).send({
      location: "dsfasdfa"
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property("message", "Updated red-flag record’s location");
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should not be able to edit the location of a record they did not create", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/1/location").set("token", tok2).send({
      location: "dsfasdfa"
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property("message", "cannot edit article you did not create");
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should not be able to edit the location of a record that does not exist", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/red-flags/2/location").set("token", tok).send({
      location: "dsfasdfa"
    }).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property("message", "Article not found");
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should not be able to delete a record that does not exist", function (done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/red-flags/2").set("token", tok).send().end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property("error", "No record found");
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should not be able to delete a record they did not create", function (done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/red-flags/1").set("token", tok2).send().end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property("error", "cannot delete record you did not create");
      res.body.should.be.an("object");
      done();
    });
  });
  it("user should be able to delete a record they created", function (done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/red-flags/1").set("token", tok).send().end(function (err, res) {
      res.should.have.status(200);
      res.body.data.should.have.property("message", "red-flag record has been deleted");
      res.body.should.be.an("object");
      done();
    });
  });
});
//# sourceMappingURL=user.test.js.map