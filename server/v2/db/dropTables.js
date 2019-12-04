import { Pool } from "pg";
import dotenv from "dotenv";
import queries from "./queries";
import executeQuery from "./connection";

dotenv.config();

const dropTables = async () => {
  try {
    let pool;

    if (process.env.NODE_ENV === "TEST") {
      pool = new Pool({ connectionString: process.env.TESTDATABASE_URL });
    } else {
      pool = new Pool({ connectionString: process.env.DATABASE_URL });
    }
    pool.on("connect", () => {
      console.log("connected");
    });

    await pool.query(queries[2].dropUser);
    await pool.query(queries[2].dropRecords);
  } catch (error) {
    console.log(error.message);
  }
};

dropTables();
