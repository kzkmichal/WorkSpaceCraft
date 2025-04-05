"use server";

import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import {
	signInSchema,
	SignInValues,
	signUpSchema,
	SignUpValues,
} from "@/lib/validations/auth";
import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";

export type BaseAuthState = {
	error?: string;
	success?: boolean;
	fieldErrors?: Record<string, string[]>;
};

export type SignInState = BaseAuthState & {
	data?: SignInValues;
};

export type SignUpState = BaseAuthState & {
	data?: SignUpValues;
};

export async function authenticate(
	prevState: SignInState | undefined,
	formData: FormData,
): Promise<SignInState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const data = { email, password };

	const validationResult = signInSchema.safeParse(data);

	if (!validationResult.success) {
		return {
			fieldErrors: validationResult.error.flatten().fieldErrors,
			data,
		};
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
		return { success: true };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Wrong login data", data };
				default:
					return {
						error: "Unexpected error during login",
						data,
					};
			}
		}
		return { error: "Unexpected error", data };
	}
}

export async function registerUser(
	prevState: SignUpState | undefined,
	formData: FormData,
): Promise<SignUpState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const name = formData.get("name") as string;
	const data = { email, password, name };

	const validationResult = signUpSchema.safeParse(data);

	if (!validationResult.success) {
		return {
			fieldErrors: validationResult.error.flatten().fieldErrors,
			data,
		};
	}

	try {
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return {
				error: "User with this email already exists",
				data,
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
			success: true,
		};
	} catch (error) {
		console.error("Register error", error);
		return {
			error: "Unexpected error during registration",
			data,
		};
	}
}

export async function loginWithGoogle() {
	await signIn("google", { redirectTo: "/" });
}

export async function logout() {
	await signOut({ redirectTo: "/" });
}
