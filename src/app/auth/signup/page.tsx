import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/modules/auth/SignUpForm";
import { auth } from "@/lib/auth";

export async function generateMetadata() {
	return {
		title: "Sign Up",
		description: "Create a new account",
		openGraph: {
			title: "Sign Up | WorkSpaceCraft",
			description: "Create a new account",
		},
	};
}

export default async function SignUpPage() {
	const session = await auth();

	if (session) {
		redirect("/");
	}

	return <SignUpForm />;
}
