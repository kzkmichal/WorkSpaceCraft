import { redirect } from "next/navigation";
import { SignInForm } from "@/components/modules/auth/SignInForm";
import { getOptionalAuth } from "@/lib/session-helpers";

export async function generateMetadata() {
	return {
		title: "Sign In",
		description: "Sign in to your account",
		openGraph: {
			title: "Sign In | WorkSpaceCraft",
			description: "Sign in to your account",
		},
	};
}

export default async function SignInPage() {
	const session = await getOptionalAuth();

	if (session) {
		redirect("/");
	}

	return <SignInForm />;
}
