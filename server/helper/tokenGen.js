import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const MakeToken = (email, id, role) =>
  jwt.sign({ email, id, role }, process.env.SECRET);

export default MakeToken;
