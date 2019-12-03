import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectString
});

const createTables = async () => {
  const users = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phoneNumber TEXT NOT NULL,
    username TEXT NOT NULL,
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

  const firstUser = `INSERT INTO users (firstname, lastname, email, phoneNumber, username, password, role) VALUES ('karen','giramata','kgiramata57@gmail','08877','kargir','000mmm','citizen')`;
  const firstRecord = `INSERT INTO records (title,type,comment,location,status,createdOn,createdBy) VALUES ('corruption','red-flag','mmm','kigali','kkk','19-02-1999','1')`;

  await pool.query(firstUser);
  await pool.query(firstRecord);
};

createTables();
