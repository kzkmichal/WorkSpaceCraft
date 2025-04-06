import { redirect } from "next/navigation";
import { SignInForm } from "@/components/modules/auth/SignInForm";
import { auth } from "@/lib/auth";

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
	const session = await auth();

	if (session) {
		redirect("/");
	}

	return <SignInForm />;
}
