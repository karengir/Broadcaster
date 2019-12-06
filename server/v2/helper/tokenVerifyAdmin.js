import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import users from "../models/users";
import queries from "../db/queries";
import executeQuerry from "../db/connection";

dotenv.config();

const tokenVerifyAdmin = async (req, res, next) => {
  const token = req.header("token");
  const valid = jwt.verify(token, process.env.SECRET);
  if (valid) {
    req.user = valid;
    if (req.user.role == "admin") {
      const checkEmail = await executeQuerry(queries[0].findEmail, [
        req.user.email
      ]);
      if (checkEmail.length === 0) {
        return res.status(401).json({
          status: 401,
          error: "Not authorized, email does not exist"
        });
      }
      next();
    } else {
      return res.status(401).json({
        status: 401,
        error: "Not authorized as user"
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      message: "invalid token"
    });
  }
};
export default tokenVerifyAdmin;
