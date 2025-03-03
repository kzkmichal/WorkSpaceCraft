import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/modules/auth/SignUpForm";
import { auth } from "@/lib/auth";

export default async function SignUpPage() {
	const session = await auth();

	if (session) {
		redirect("/");
	}

	return <SignUpForm />;
}
