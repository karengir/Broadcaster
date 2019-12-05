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
    createdOn TEXT NOT NULL,
    createdBy TEXT NOT NULL
  )`;

  await pool.query(users);
  await pool.query(records);
};

createTables();
