"use client";

import { useActionState } from "react";
import Link from "next/link";
import { authenticate, loginWithGoogle } from "@/app/actions/auth";
import { Container } from "@/components/common/molecules";

export function SignInForm() {
	const [state, formAction] = useActionState(authenticate, undefined);

	return (
		<Container size={"sm"}>
			<div>
				<h2 className="text-center text-3xl font-bold">Sign in</h2>
			</div>
			<form action={formAction} className="mt-8 space-y-6">
				<div className="space-y-4 rounded-md shadow-sm">
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
						Sign in
					</button>
				</div>
			</form>

			<div className="relative my-6 text-center">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-300"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="bg-white px-2 text-gray-500">or</span>
				</div>
			</div>

			<form action={loginWithGoogle}>
				<button
					className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					type="submit"
				>
					<svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
						{/* Logo Google SVG */}
						<path
							d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
							fill="#4285F4"
						/>
						<path
							d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
							fill="#4285F4"
						/>
					</svg>
					Sign in with Google
				</button>
				<div className="text-center text-sm">
					Don&apos;t have an account?
					<Link
						href="/auth/signup"
						className="text-blue-600 hover:text-blue-800"
					>
						Sign up
					</Link>
				</div>
			</form>
		</Container>
	);
}
