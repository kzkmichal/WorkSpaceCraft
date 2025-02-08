import Link from "next/link";
import { SignUpForm } from "@/components/modules/auth/SignUpForm";

export default function SignUpPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md rounded-lg border p-6 shadow-lg">
				<h1 className="mb-6 text-2xl font-bold">Create Account</h1>
				<SignUpForm />
				<div className="mt-4 text-center text-sm">
					Already have an account?
					<Link
						href="/auth/signin"
						className="text-blue-600 hover:underline"
					>
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}
