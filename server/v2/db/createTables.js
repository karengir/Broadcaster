import { Pool } from "pg";
import dotenv from "dotenv";

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

const createTables = async () => {
  const users = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phoneNumber TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`;

  const records = `CREATE TABLE IF NOT EXISTS records(
    id SERIAL NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    comment TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdBy TEXT NOT NULL
  )`;

  await pool.query(users);
  await pool.query(records);

  const firstUser = `INSERT INTO users (firstname, lastname, email, phoneNumber, username, password, role) VALUES ('john','paul','jpaul@gmail.com','088700','jayp','$2a$10$6W748staJTakfi7scmJcuedYMfMOpIqiDKYEEkxlzSJp7ewh4hGge','admin')`;
  // const firstRecord = `INSERT INTO records (title,type,comment,location,status,createdOn,createdBy) VALUES ('corruption','red-flag','mmm','kigali','kkk','19-02-1999','1')`;

  await pool.query(firstUser);
  // await pool.query(firstRecord);
};

createTables();
