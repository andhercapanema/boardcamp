import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const connectionDB = new pkg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

export default connectionDB;
