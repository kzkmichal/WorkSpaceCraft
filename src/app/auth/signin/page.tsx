import { redirect } from "next/navigation";
import { SignInForm } from "@/components/modules/auth/SignInForm";
import { auth } from "@/lib/auth";

export default async function SignInPage() {
	const session = await auth();

	if (session) {
		redirect("/");
	}

	return <SignInForm />;
}
