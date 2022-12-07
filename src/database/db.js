import pkg from "pg";

const connection = new pkg.Pool({
    connectionString: process.env.DATABASE_URL,
});

export default connection;
