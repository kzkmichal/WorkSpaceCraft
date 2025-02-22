"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/graphql/generated/graphql";

export const SignUpForm = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const [signUp] = useSignUpMutation();

	async function handleSubmit(
		event: React.FormEvent<HTMLFormElement>,
	) {
		event.preventDefault();
		setError(null);
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const result = await signUp({
				variables: {
					input: {
						name,
						email,
						password,
					},
				},
			});

			if (!result.data) {
				setError("Registration failed");
				return;
			}
			const signInResult = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (signInResult?.error) {
				setError("Failed to sign in after registration");
				return;
			}

			router.push("/");
			router.refresh();
		} catch (e) {
			setError(
				e instanceof Error
					? e.message
					: "An error occurred during sign up",
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{error && (
				<div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
					{error}
				</div>
			)}

			<div>
				<label htmlFor="name" className="block text-sm font-medium">
					Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm"
				/>
			</div>

			<div>
				<label htmlFor="email" className="block text-sm font-medium">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm"
				/>
			</div>

			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium"
				>
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
			>
				{loading ? "Creating account..." : "Sign Up"}
			</button>
		</form>
	);
};
