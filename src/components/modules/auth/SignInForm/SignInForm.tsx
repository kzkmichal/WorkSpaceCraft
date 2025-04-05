"use client";

import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	authenticate,
	loginWithGoogle,
	type SignInState,
} from "@/app/actions/auth";
import { FormError } from "@/components/common/molecules/Form";
import { Container } from "@/components/common/molecules";

export function SignInForm() {
	const router = useRouter();
	const [state, formAction] = useActionState<
		SignInState | undefined,
		FormData
	>(authenticate, undefined);

	useEffect(() => {
		if (state?.success) {
			router.push("/");
			router.refresh();
		}
	}, [state?.success, router]);

	return (
		<Container size={"sm"}>
			<div>
				<h2 className="text-center text-3xl font-bold">Sign In</h2>
			</div>
			<form action={formAction} className="mt-8 space-y-6">
				{state?.error && <FormError message={state.error} />}
				<div className="space-y-4 rounded-md shadow-sm">
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
							defaultValue={state?.data?.password || ""}
							required
							className={`relative mt-1 block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ${
								state?.fieldErrors?.password
									? "ring-red-500"
									: "ring-gray-300"
							} placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600`}
							placeholder="Your password"
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
					>
						Sign In
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
						<path
							d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
							fill="#4285F4"
						/>
					</svg>
					Sign In with Google
				</button>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?
					<Link
						href="/auth/signup"
						className="text-blue-600 hover:text-blue-800"
					>
						Sign Up
					</Link>
				</div>
			</form>
		</Container>
	);
}
