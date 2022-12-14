import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const connectionDB = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

export default connectionDB;
