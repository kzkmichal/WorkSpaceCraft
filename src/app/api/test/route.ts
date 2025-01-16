import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET() {
	try {
		const count = await prisma.user.findMany({
			include: {
				products: true,
			},
		});

		return NextResponse.json(
			{
				message: "Połączenie z bazą danych działa!",
				userCount: count,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Database connection error:", error);
		return NextResponse.json(
			{
				error: "Nie udało się połączyć z bazą danych",
			},
			{ status: 500 },
		);
	}
}

export async function POST() {
	try {
		const user = await prisma.user.create({
			data: {
				name: "testuser" + Math.random(),
				email: `test${Math.random()}@example.com`,
				password: "test123",
			},
		});

		return NextResponse.json(
			{
				message: "Użytkownik utworzony!",
				user,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating user:", error);
		return NextResponse.json(
			{
				error: "Nie udało się utworzyć użytkownika",
			},
			{ status: 500 },
		);
	}
}
