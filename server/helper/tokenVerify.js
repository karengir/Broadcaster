import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import users from '../models/users';

dotenv.config();

const tokenVerify = (req, res, next) => {
  try {
    const token = req.header("token");
    const valid = jwt.verify(token, process.env.SECRET);
    req.user = valid;
    const checkEmail = users.find(user => user.email == req.user.email);
    if(!checkEmail){
      return res.status(401).json({
        status: 401,
        error: "Not authorized"
      })
    }
    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "invalid token"
    });
  }
};
export default tokenVerify;
