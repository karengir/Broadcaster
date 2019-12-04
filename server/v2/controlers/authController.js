import MakeToken from "../helper/tokenGen";
import { passwordhash, passwordVerify } from "../helper/passwordHash";
import executeQuerry from "../db/connection";
import queries from "../db/queries";

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
        token: MakeToken(user.email, user.id, user.role)
      });
    } else {
      return res.status(409).json({
        status: 409,
        message: "user already exists"
      });
    }
  }
}

export default authController;
