import { Pool } from "pg";

export const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: parseInt(process.env.DB_PORT || "5432"),
	ssl:
		process.env.NODE_ENV === "production"
			? { rejectUnauthorized: true }
			: false,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

pool.on("error", (err, _client) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1);
});
