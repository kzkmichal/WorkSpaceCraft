import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Profile } from "@/components/modules";
import { UserFieldsFragment } from "@/graphql/generated/graphql";

export default async function ProfilePage() {
	const session = await auth();

	if (!session) {
		redirect("/auth/signin");
	}

	return <Profile {...(session.user as UserFieldsFragment)} />;
}
