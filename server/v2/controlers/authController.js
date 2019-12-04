import MakeToken from "../helper/tokenGen";
import { passwordhash, passwordVerify } from "../helper/passwordHash";
import executeQuerry from "../db/connection";
import queries from "../db/queries";
import bcrypt from "bcryptjs";

class authController {
  static async signup(req, res) {
    const passwordEncry = passwordhash(req.body.password);
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: passwordEncry,
      role: "citizen"
    };

    const found = await executeQuerry(queries[0].findEmail, [user.email]);
    if (found.rowCount === 0 || found.length === 0) {
      let parameters = [
        user.firstname,
        user.lastname,
        user.email,
        user.phoneNumber,
        user.username,
        user.password,
        user.role
      ];
      await executeQuerry(queries[0].insertUser, parameters);
      return res.status(201).json({
        status: 201,
        message: "User successfully created",
        data: Object.defineProperty(user, "password", {
          enumerable: false,
          writable: true
        }),
        token: MakeToken(user.email, "1", user.role)
      });
    }
    return res.status(409).json({
      status: 409,
      message: "user already exists"
    });
  }

  static async signin(req, res) {
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    const found = await executeQuerry(queries[0].findEmail, [user.email]);
    if (found.length === 1) {
      const compare = bcrypt.compareSync(user.password, found[0].password);
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
