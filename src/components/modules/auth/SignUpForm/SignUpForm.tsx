"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser, type SignUpState } from "@/app/actions/auth";
import {
	FormError,
	FormSuccess,
} from "@/components/common/molecules/Form";
import { Container } from "@/components/common/molecules";

export function SignUpForm() {
	const router = useRouter();
	const [state, formAction] = useActionState<
		SignUpState | undefined,
		FormData
	>(registerUser, undefined);

	useEffect(() => {
		if (state?.success) {
			const redirectTimer = setTimeout(() => {
				router.push("/");
				router.refresh();
			}, 2000);

			return () => clearTimeout(redirectTimer);
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
				{state?.error && <FormError message={state.error} />}
				{state?.success && (
					<FormSuccess message="Registration successful! Redirecting in a moment..." />
				)}
				<div className="space-y-4 rounded-md shadow-sm">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Full Name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							defaultValue={state?.data?.name || ""}
							className={`relative mt-1 block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ${
								state?.fieldErrors?.name
									? "ring-red-500"
									: "ring-gray-300"
							} placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600`}
							placeholder="Your full name"
						/>
						{state?.fieldErrors?.name && (
							<p className="mt-1 text-sm text-red-600">
								{state.fieldErrors.name[0]}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							defaultValue={state?.data?.email || ""}
							className={`relative mt-1 block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ${
								state?.fieldErrors?.email
									? "ring-red-500"
									: "ring-gray-300"
							} placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600`}
							placeholder="Your email"
						/>
						{state?.fieldErrors?.email && (
							<p className="mt-1 text-sm text-red-600">
								{state.fieldErrors.email[0]}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							className={`relative mt-1 block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ${
								state?.fieldErrors?.password
									? "ring-red-500"
									: "ring-gray-300"
							} placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600`}
							placeholder="Password (minimum 8 characters)"
						/>
						{state?.fieldErrors?.password && (
							<p className="mt-1 text-sm text-red-600">
								{state.fieldErrors.password[0]}
							</p>
						)}
					</div>
				</div>

				<div>
					<button
						type="submit"
						className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						disabled={!!state?.success}
					>
						Sign Up
					</button>
				</div>
			</form>

			<div className="mt-4 text-center text-sm">
				Already have an account?
				<Link
					href="/auth/signin"
					className="text-blue-600 hover:text-blue-800"
				>
					Sign In
				</Link>
			</div>
		</Container>
	);
}
