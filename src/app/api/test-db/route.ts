import { NextResponse } from "next/server";
import { type QueryResult } from "pg";
import { pool } from "@/lib/db";

interface TimeQueryResult {
	current_time: Date;
}

export async function GET() {
	try {
		const client = await pool.connect();
		const result: QueryResult<TimeQueryResult> = await client.query(
			"SELECT NOW() as current_time",
		);
		client.release();

		if (result.rows.length > 0) {
			return NextResponse.json({
				message: "Connected to database",
				currentTime: result.rows[0].current_time,
			});
		} else {
			return NextResponse.json(
				{ error: "No results from database" },
				{ status: 500 },
			);
		}
	} catch (error) {
		console.error("Error during database connection:", error);
		return NextResponse.json(
			{ error: "Failed to connect to the database" },
			{ status: 500 },
		);
	} finally {
		await pool.end();
	}
}
