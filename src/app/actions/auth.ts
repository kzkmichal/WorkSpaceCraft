"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";

export async function authenticate(
	prevState: { error: string } | undefined,
	formData: FormData,
) {
	try {
		await signIn("credentials", {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			redirect: false,
		});

		redirect("/");
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Wrong login data" };
				default:
					return { error: "Problem occurred after login attempt" };
			}
		}
		throw error;
	}
}

export async function registerUser(
	prevState: { error: string; success?: boolean } | undefined,
	formData: FormData,
) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const name = formData.get("name") as string;

	if (!email || !password || !name) {
		return { error: "All fields are mandatory", success: false };
	}

	try {
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return {
				error: "User with this email already exists.",
				success: false,
			};
		}

		const hashedPassword = await hash(password, 10);

		await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
		});

		await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		return {
			error: "",
			success: true,
		};
	} catch (error) {
		console.error("Register error", error);
		return {
			error: "An error occurred during registration",
			success: false,
		};
	}
}

export async function loginWithGoogle() {
	await signIn("google", { redirectTo: "/" });
}

export async function logout() {
	await signOut({ redirectTo: "/" });
}
