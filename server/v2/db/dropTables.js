import { Pool } from "pg";
import dotenv from "dotenv";
import queries from "./queries";
import executeQuery from "./connection";

dotenv.config();

const dropTables = async () => {
  try {
    const connectionstring = process.env.DATABASE_URL;
    const pool = new Pool({
      connectionString: connectionstring
    });

    await pool.query(queries[2].dropUser);
    await pool.query(queries[2].dropRecords);
  } catch (error) {
    console.log(error.message);
  }
};

dropTables();
