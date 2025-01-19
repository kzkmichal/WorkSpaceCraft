import Link from "next/link";
import { SignInForm } from "@/components/auth/SignInForm";

export default function SignInPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md rounded-lg border p-6 shadow-lg">
				<h1 className="mb-6 text-2xl font-bold">Sign In</h1>
				<SignInForm />
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?
					<Link
						href="/auth/signup"
						className="text-blue-600 hover:underline"
					>
						Create Account
					</Link>
				</div>
			</div>
		</div>
	);
}
