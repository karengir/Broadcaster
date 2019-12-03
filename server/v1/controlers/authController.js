import bcrypt from "bcryptjs";
import users from "../models/users";
import MakeToken from "../helper/tokenGen";
import { passwordhash, passwordVerify } from "../helper/passwordHash";

class authController {
  static signup(req, res) {
    const passwordEncry = passwordhash(req.body.password);
    const user = {
      id: users.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: passwordEncry,
      role: "citizen"
    };

    const found = users.find(u => u.email === user.email);
    if (!found) {
      users.push(user);
      return res.status(201).json({
        status: 201,
        message: "User successfully created",
        data: Object.defineProperty(user, "password", {
          enumerable: false,
          writable: true
        }),
        token: MakeToken(user.email, user.id, user.role)
      });
    }
    return res.status(409).json({
      status: 409,
      message: "user already exists"
    });
  }

  static signin(req, res) {
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    const found = users.find(u => u.email === user.email);
    if (found) {
      const compare = passwordVerify(user.password, found.password);
      if (compare) {
        const tokn = MakeToken(user.email, user.id, found.role);
        return res.status(200).json({
          status: 200,
          token: tokn,
          message: "User successfully logged in"
        });
      }
      return res.status(401).json({
        status: 401,
        error: "Password or email is incorrect"
      });
    }
    return res.status(404).json({
      status: 404,
      error: "Password or email is incorrect"
    });
  }
}

export default authController;
