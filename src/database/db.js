import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const connection = new pkg.Pool({
    connectionString: process.env.DATABASE_URL,
});

export default connection;
