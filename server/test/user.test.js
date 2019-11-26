/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-unsupported-features/es-syntax */
import chai from 'chai';
import chaiHttp from 'chai-http';
import users from '../models/users';
import app from '../app';


chai.use(chaiHttp);
chai.should();

const user = {
    firstname: "Giramata",
    lastname: "Karen",
	email: "kgiramata%7@gmail.com",
    phoneNumber: "078888",
    username: "gkar",
    password: "1234567"
      
};
describe('sign Up tests', ()=> {

    it("user should be able to create an account", done => {
        chai.request(app).post("/api/v1/auth/signup")
            .send(user)
            .end((err,res) => {
                res.should.have.status(201);
                res.body.should.have.property("message", "User successfully created");
                res.body.should.be.a("object");

                done();
            });
    });

    it("user should not be able to create account when invalid firstname", done => {
        chai.request(app).post("/api/v1/auth/signup").send({
            firstname: "",
            lastname: "Karen",
            email: "kgiramata%7@gmail",
            phoneNumber: "078888",
            username: "gkar",
            password: "1234567"
        }).end((err,res) => {
            res.should.have.status(400);
            res.body.should.be.an("object");
            done();
        });
    });

    it("user should not be able to create account when email already exists", done =>{
        users.push(user);
        chai.request(app).post("/api/v1/auth/signup")
            .send(user)
            .end((err,res) => {
            res.should.have.status(409);
            res.body.should.have.property("message", "user already exists");
            res.body.should.be.an("object");
            done();
        });
    });
 });
