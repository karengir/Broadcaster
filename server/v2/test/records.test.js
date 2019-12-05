import chai from "chai";
import chaiHttp from "chai-http";
import users from "../models/users";
import app from "../../app";
import MakeToken from "../helper/tokenGen";

chai.use(chaiHttp);
chai.should();

const tok = MakeToken("kgiramata%7@gmail.com", "1", "citizen");
const tok3 = MakeToken("kgiramata%7@gmail.com", "1", "admin");
const tok2 = MakeToken("kgiramata57@gmail.com", "citizen");
const tok1 = MakeToken("jpaul@gmail.com", "2", "admin");

const redflag = {
  title: "robbery",
  type: "red-flag",
  comment: "Urgent",
  location: "KG 30 ST 5"
};

const redflag2 = {
  title: "",
  type: "red-flag",
  comment: "Urgent",
  location: "KG 30 ST 5",
  status: "yet to be resolved"
};

describe(" record tests", () => {
  it("user should be able to create a record", done => {
    chai
      .request(app)
      .post("/api/v2/red-flags/")
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
      .post("/api/v2/red-flags/")
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

  it("user should not be able to create a record when role is admin", done => {
    chai
      .request(app)
      .post("/api/v2/red-flags/")
      .set("token", tok3)
      .send(redflag)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("error", "Not authorized as admin");
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should be able to view all red-flags", done => {
    chai
      .request(app)
      .get("/api/v2/red-flags/red-flags")
      .set("token", tok)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        done();
      });
  });

  it("user should be able to view one specific red-flag", done => {
    chai
      .request(app)
      .get("/api/v2/red-flags/1")
      .set("token", tok)
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
      .get("/api/v1/red-flags/22")
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message", "Record not found");
        done();
      });
  });
});
