import bcrypt from "bcryptjs";

const passwordhash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const passwordVerify = (userPassword, foundPassword) =>
  bcrypt.compareSync(userPassword, foundPassword);

export { passwordhash, passwordVerify };
