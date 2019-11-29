import chai from "chai";
import chaiHttp from "chai-http";
import users from "../models/users";
import app from "../app";
import MakeToken from "../helper/tokenGen";

chai.use(chaiHttp);
chai.should();

const tok = MakeToken("kgiramata%7@gmail.com");
const tok2 = MakeToken("kgiramata57@gmail.com", "1");

const user = {
  firstname: "Giramata",
  lastname: "Karen",
  email: "kgiramata%7@gmail.com",
  phoneNumber: "078888",
  username: "gkar",
  password: "1234567"
};

const logUser = {
  email: "kgiramata%7@gmail.com",
  password: "1234567"
};

const redflag = {
  title: "robbery",
  type: "red-flag",
  comment: "Urgent",
  location: "KG 30 ST 5",
  status: "yet to be resolved"
};

const redflag2 = {
  title: "",
  type: "red-flag",
  comment: "Urgent",
  location: "KG 30 ST 5",
  status: "yet to be resolved"
};

describe("sign Up tests", () => {
  it("user should be able to create an account", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message", "User successfully created");
        res.body.should.be.a("object");

        done();
      });
  });

  it("user should not be able to create account when invalid firstname", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstname: "",
        lastname: "Karen",
        email: "kgiramata%7@gmail",
        phoneNumber: "078888",
        username: "gkar",
        password: "1234567"
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should not be able to create account when email already exists", done => {
    users.push(user);
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property("message", "user already exists");
        res.body.should.be.an("object");
        done();
      });
  });
});

describe("sign in tests", () => {
  it("user should be able to log into their account", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send(logUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message", "User successfully logged in");
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should not be able to log in when password is incorrect", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "kgiramata%7@gmail.com",
        password: "123490"
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property(
          "error",
          "Password or email is incorrect"
        );
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should not be able to log in when invalid email", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: " ",
        password: "1234567"
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should not be able to log in when email does not exist", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "kgiramata@gmail.com",
        password: "1234567"
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property(
          "error",
          "Password or email is incorrect"
        );
        res.body.should.be.an("object");
        done();
      });
  });
});

describe("first page test", () => {
  it("welcome page", done => {
    chai
      .request(app)
      .get("/")
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message", "Broadcaster project");
        res.body.should.be.a("object");
        done();
      });
  });
});

describe(" record tests", () => {
  it("user should be able to create a record", done => {
    chai
      .request(app)
      .post("/api/v1/red-flags/")
      .set("token", tok)
      .send(redflag)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message", "record created successfully");
        res.body.should.be.a("object");
        done();
      });
  });
  it("user should not be able to create a record when invalid title", done => {
    chai
      .request(app)
      .post("/api/v1/red-flags/")
      .set("token", tok)
      .send(redflag2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property(
          "error",
          '"title" is not allowed to be empty'
        );
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should be able to view all red-flags", done => {
    chai
      .request(app)
      .get("/api/v1/red-flags/red-flags")
      .send(redflag)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should be able to view one specific red-flag", done => {
    chai
      .request(app)
      .get("/api/v1/red-flags/1")
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should not be able to view a specific red-flag if id does not exist", done => {
    chai
      .request(app)
      .get("/api/v1/red-flags/2")
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message", "Record not found");
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should be able to edit the location of a record they created", done => {
    chai
      .request(app)
      .patch("/api/v1/red-flags/1/location")
      .set("token", tok)
      .send({ location: "dsfasdfa" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property(
          "message",
          "Updated red-flag record’s location"
        );
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should not be able to edit the location of a record they did not create", done => {
    chai
      .request(app)
      .patch("/api/v1/red-flags/1/location")
      .set("token", tok2)
      .send({ location: "dsfasdfa" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property(
          "message",
          "you cannot edit a record that you did not create"
        );
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should not be able to edit the location of a record that does not exist", done => {
    chai
      .request(app)
      .patch("/api/v1/red-flags/2/location")
      .set("token", tok)
      .send({ location: "dsfasdfa" })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message", "Record not found");
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should be able to edit the comment of a record they created", done => {
    chai
      .request(app)
      .patch("/api/v1/red-flags/1/comment")
      .set("token", tok)
      .send({ comment: "it has been long" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.have.property(
          "message",
          "Updated red-flag record’s comment"
        );
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should not be able to delete a record that does not exist", done => {
    chai
      .request(app)
      .delete("/api/v1/red-flags/2")
      .set("token", tok)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("error", "No record found");
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should not be able to delete a record they did not create", done => {
    chai
      .request(app)
      .delete("/api/v1/red-flags/1")
      .set("token", tok2)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property(
          "error",
          "cannot delete record you did not create"
        );
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should be able to delete a record they created", done => {
    chai
      .request(app)
      .delete("/api/v1/red-flags/1")
      .set("token", tok)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.have.property(
          "message",
          "red-flag record has been deleted"
        );
        res.body.should.be.an("object");
        done();
      });
  });
});
