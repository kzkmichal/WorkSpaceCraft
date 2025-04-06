"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth";
import { Container } from "@/components/common/molecules";

export function SignUpForm() {
	const [state, formAction] = useActionState(registerUser, undefined);
	const router = useRouter();

	useEffect(() => {
		if (state?.success) {
			router.push("/");
		}
	}, [state?.success, router]);

	return (
		<Container size={"sm"}>
			<div>
				<h2 className="text-center text-3xl font-bold">
					Create an account
				</h2>
			</div>

			<form action={formAction} className="mt-8 space-y-6">
				<div className="space-y-4 rounded-md shadow-sm">
					<div>
						<label htmlFor="name" className="sr-only">
							Name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
							placeholder="Name"
						/>
					</div>

					<div>
						<label htmlFor="email" className="sr-only">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
							placeholder="Email"
						/>
					</div>

					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
							placeholder="Password"
						/>
					</div>
				</div>

				{state?.error && (
					<div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
						{state.error}
					</div>
				)}

				<div>
					<button
						type="submit"
						className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Sign up
					</button>
				</div>
			</form>

			<div className="text-center text-sm">
				Already have an account?
				<Link
					href="/auth/signin"
					className="text-blue-600 hover:text-blue-800"
				>
					Sign in
				</Link>
			</div>
		</Container>
	);
}
