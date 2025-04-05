import { z } from "zod";

export const signInSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Invalid email format" }),
	password: z
		.string()
		.min(1, { message: "Password is required" })
		.min(3, {
			message: "Password must be at least 3 characters long",
		}),
});

export const signUpSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }).min(2, {
		message: "Name must be at least 2 characters long",
	}),
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Invalid email format" }),
	password: z
		.string()
		.min(1, { message: "Password is required" })
		.min(3, {
			message: "Password must be at least 3 characters long",
		})
		.regex(/^(?=.*[A-Z])(?=.*\d)/, {
			message:
				"Password must contain at least one capital letter and one number",
		}),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
