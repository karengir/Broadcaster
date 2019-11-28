import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const MakeToken = (email, id) => jwt.sign({ email, id }, process.env.SECRET);

export default MakeToken;
