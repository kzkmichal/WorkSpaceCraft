"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignInForm = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(
		event: React.FormEvent<HTMLFormElement>,
	) {
		event.preventDefault();
		setError(null);
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError("Invalid credentials");
				return;
			}

			router.push("/");
			router.refresh();
		} catch (e) {
			console.error(e);
			setError("An error occurred during sign in");
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
				{loading ? "Signing in..." : "Sign In"}
			</button>
		</form>
	);
};
