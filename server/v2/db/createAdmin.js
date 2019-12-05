import { Pool } from "pg";
import dotenv from "dotenv";
import queries from "./queries";
import executeQuerry from "./connection";

dotenv.config();

let pool;

if (process.env.NODE_ENV === "TEST") {
  pool = new Pool({ connectionString: process.env.TESTDATABASE_URL });
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}
pool.on("connect", () => {
  console.log("connected");
});

const createAdmin = async () => {
  //const findAdmin = `SELECT FROM users WHERE role = "admin"`;
  const found = await executeQuerry(queries[0].findEmail, ["jpaull@gmail.com"]);
  if (found.rowCount === 0 || found.length === 0) {
    const admin = `INSERT INTO users (firstname, lastname, email, phoneNumber, username, password, role) VALUES ('john','paul','jpaull@gmail.com','0887000','jayp0','$2a$10$6W748staJTakfi7scmJcuedYMfMOpIqiDKYEEkxlzSJp7ewh4hGge','admin')`;
    await pool.query(admin);
  }
};

createAdmin();
